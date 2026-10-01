// Settings live in localStorage: `theme` ("normal"/"hacker"/"norse") and
// `lang` ("auto"/"nb"/"nn"/"en"). Changes apply immediately, here and in any
// other open tab (via the storage event).
const DEFAULTS = { theme: 'normal', lang: 'auto' };

function render() {
    for (const [key, fallback] of Object.entries(DEFAULTS)) {
        const value = localStorage.getItem(key) || fallback;
        const input = document.querySelector(`input[name="${key}"][value="${value}"]`)
            || document.querySelector(`input[name="${key}"][value="${fallback}"]`);
        input.checked = true;
    }
}

document.addEventListener('change', (e) => {
    const { name, value } = e.target;
    if (!(name in DEFAULTS)) return;
    if (value === DEFAULTS[name]) localStorage.removeItem(name);
    else localStorage.setItem(name, value);
    if (name === 'theme') applyTheme();
    if (name === 'lang') applyI18n();
});

addEventListener('storage', render);
applyI18n();
render();
