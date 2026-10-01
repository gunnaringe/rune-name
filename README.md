# Rune name

This is a small project "seeing your name in Runes".

If you see any errors, please let me know by creating an issue or make a pull request.

## Sources
- https://www.vikingrune.com/
- https://en.wikipedia.org/wiki/Runic_(Unicode_block)
- https://www.norron-mytologi.info/diverse/runeskrift.htm

## Development

Plain HTML/CSS/JS in `site/`, no build step. Serve it locally with
`python3 -m http.server -d site` and open http://localhost:8000.

- `index.html` + `app.js` — the translator; alphabets in `long-branch.js`,
  `short-twig.js`, `elder-futhark.js`.
- `settings.html` + `settings.js` — theme and language, stored in
  `localStorage` (`theme`: `normal`/`hacker`/`norse`, `lang`: `auto`/`nb`/`nn`/`is`/`en`).
- `i18n.js` — all UI strings, wired via `data-i18n` attributes.
- `theme.js` — loaded in `<head>` so the theme applies before first paint.
- `sw.js` — network-first offline support. Must stay at `/sw.js`.
- `fonts/` — self-hosted Junicode (subset to Latin + Runic) and VT323, both SIL OFL.

## Hosting

Cloudflare Pages project `rune-name` (root directory `site`), served at
https://runenavn.apphub.casa and https://runenavn.cc. Pushing to `main`
deploys; every branch gets a preview at `https://<branch>.rune-name.pages.dev`.
