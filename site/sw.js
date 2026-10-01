// Offline support. Must stay at /sw.js with scope "/": that's where older
// versions of the app registered their worker, and replacing it here is the
// only way those visitors get updates.
//
// Everything is network-first: a deploy shows up on the next load, and the
// cached copy is only used offline. (The first version was cache-first with a
// cache that never expired, so it kept serving the old site forever; its
// cache, "rune-name", is deleted on activate like any other old cache.)
//
// Cloudflare Pages serves "pretty" URLs: /index.html redirects to / and
// /settings.html to /settings. Cache keys are normalised the same way, so the
// app works offline whichever form was requested. Redirected responses are
// never served to a navigation (browsers reject those).
//
// Bump CACHE only when changing what's precached or how.

const CACHE = 'rune-name-v2';
const PRECACHE = [
    '/', '/settings.html', '/style.css', '/theme.js', '/i18n.js', '/app.js', '/settings.js',
    '/long-branch.js', '/short-twig.js', '/elder-futhark.js',
    '/site.webmanifest', '/favicon-32x32.png', '/apple-touch-icon.png', '/android-chrome-192x192.png',
    '/fonts/junicode-runic.woff2', '/fonts/vt323-latin.woff2', '/fonts/vt323-latin-ext.woff2',
];

// "/index.html" -> "/", "/settings.html" -> "/settings".
function cacheKey(url) {
    const u = new URL(url);
    u.search = '';
    u.hash = '';
    u.pathname = u.pathname.replace(/\/index(\.html)?$/, '/').replace(/\.html$/, '');
    return u.href;
}

// A cacheable copy: redirects are followed and the result stored as a plain
// response for the key of the original request.
async function store(cache, key, res) {
    if (!res.ok) return;
    const copy = res.redirected ? new Response(await res.blob(), { headers: res.headers }) : res;
    await cache.put(key, copy);
}

self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(CACHE);
        // One by one, so a single missing file doesn't fail the install.
        await Promise.all(PRECACHE.map(async (path) => {
            const url = new URL(path, self.location.origin).href;
            try { await store(cache, cacheKey(url), await fetch(url, { cache: 'no-store' })); } catch {}
        }));
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim()),
    );
});

self.addEventListener('fetch', (e) => {
    const req = e.request;
    const url = new URL(req.url);
    if (req.method !== 'GET' || url.origin !== location.origin) return;
    const key = cacheKey(req.url);

    e.respondWith((async () => {
        try {
            const res = await fetch(req);
            // Navigations get redirect mode "manual": a Pages redirect comes
            // back as an opaque redirect for the browser to follow. Not cached.
            if (res.ok && res.type !== 'opaqueredirect') {
                const copy = res.clone();
                e.waitUntil(caches.open(CACHE).then((cache) => store(cache, key, copy)));
            }
            return res;
        } catch (err) {
            const hit = await caches.match(key);
            if (hit) return hit;
            throw err;
        }
    })());
});
