const inputElement = document.getElementById('input-text');
const notice = document.getElementById('doubles-notice');
const outputs = {
    'long-branch': LongBranch,
    'short-twig': ShortTwig,
    'elder-futhark': ElderFuthark,
};

// Letters the rune tables don't have, as the nearest ones they do: þ and ð
// were both written with ᚦ (via "th"), accented vowels as the plain vowel.
const EXTRA_LETTERS = { þ: 'th', ð: 'th', á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ý: 'y', ö: 'ø', ä: 'æ' };

// The same rune twice in a row. Rune carvers wrote it once, even for two
// different letters with the same rune (like "ck").
const DOUBLE_RUNE = /(\p{Script=Runic})\1+/gu;

// Setting `doubles`: "both" (default) writes double letters as typed,
// "once" writes them once like on the rune stones.
function writeDoublesOnce() {
    return localStorage.getItem('doubles') === 'once';
}

function update() {
    const name = inputElement.value.trim();
    // Double spaces keep words apart once they're in runes.
    const inputText = (name || 'Futhark').toLowerCase()
        .replace(/[þðáéíóúýöä]/g, (c) => EXTRA_LETTERS[c])
        .replace(/ /g, '  ');

    let hasDoubles = false;
    for (const [id, alphabet] of Object.entries(outputs)) {
        let runes = alphabet.translate(inputText);
        if (name && runes.match(DOUBLE_RUNE)) hasDoubles = true;
        if (writeDoublesOnce()) runes = runes.replace(DOUBLE_RUNE, '$1');
        document.getElementById(id).textContent = runes;
    }

    notice.hidden = !hasDoubles || writeDoublesOnce() || localStorage.getItem('doublesNoticeDismissed') === '1';
}

document.getElementById('doubles-dismiss').addEventListener('click', () => {
    localStorage.setItem('doublesNoticeDismissed', '1');
    notice.hidden = true;
    inputElement.focus();
});

// Shares just the name in runes: the system share sheet where there is one
// (phones, mostly), otherwise the clipboard.
for (const button of document.querySelectorAll('.share')) {
    const label = button.querySelector('span');
    let timer;
    button.addEventListener('click', async () => {
        const text = document.getElementById(button.dataset.target).textContent;
        if (navigator.share && navigator.canShare?.({ text }) !== false) {
            try {
                await navigator.share({ text });
            } catch {
                // Cancelled by the user, or not allowed. Nothing to report.
            }
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            label.textContent = t('copied');
            button.classList.add('done');
        } catch {
            label.textContent = t('copyFailed');
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            label.textContent = t('share');
            button.classList.remove('done');
        }, 1500);
    });
}

// A link with ?n=<name> fills in that name. Otherwise the name typed earlier in this
// tab comes back, e.g. after a trip to the settings page.
const shared = new URLSearchParams(location.search).get('n');
inputElement.value = (shared ?? sessionStorage.getItem('name') ?? '').slice(0, 100);

inputElement.addEventListener('input', () => {
    sessionStorage.setItem('name', inputElement.value);
    update();
});
addEventListener('storage', update);
// Coming back from the settings page via the back button can restore this
// page from the back/forward cache, without running any of the above again.
addEventListener('pageshow', (e) => { if (e.persisted) { applyTheme(); applyI18n(); update(); } });
applyI18n();
update();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}
