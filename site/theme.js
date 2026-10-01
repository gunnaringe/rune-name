// Loaded in <head> so the page never flashes the wrong theme. The stored
// choice is "normal" (follows the system light/dark setting), "hacker" or
// "norse"; the resolved theme goes on <html data-theme>.
(function () {
    const THEME_COLORS = { light: '#f5f6fa', dark: '#0d1117', hacker: '#000000', norse: '#ead9b5' };
    const light = matchMedia('(prefers-color-scheme: light)');

    function applyTheme() {
        let theme = localStorage.getItem('theme');
        if (theme !== 'hacker' && theme !== 'norse') theme = light.matches ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = THEME_COLORS[theme];
    }

    applyTheme();
    light.addEventListener('change', applyTheme);
    addEventListener('storage', applyTheme);
    window.applyTheme = applyTheme;
})();
