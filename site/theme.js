// Loaded in <head> so the page never flashes the wrong theme. The stored
// choice is "norse" (default), "normal" (follows the system light/dark
// setting) or "hacker"; the resolved theme goes on <html data-theme>.
(function () {
    const THEME_COLORS = { light: '#f5f6fa', dark: '#0d1117', hacker: '#000000', norse: '#ead9b5' };
    const light = matchMedia('(prefers-color-scheme: light)');

    function applyTheme() {
        let theme = localStorage.getItem('theme');
        if (theme === 'normal') theme = light.matches ? 'light' : 'dark';
        else if (theme !== 'hacker') theme = 'norse';
        document.documentElement.dataset.theme = theme;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = THEME_COLORS[theme];
    }

    applyTheme();
    light.addEventListener('change', applyTheme);
    addEventListener('storage', applyTheme);
    window.applyTheme = applyTheme;
})();
