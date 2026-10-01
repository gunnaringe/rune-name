const inputElement = document.getElementById('input-text');
const outputs = {
    'long-branch': LongBranch,
    'short-twig': ShortTwig,
    'elder-futhark': ElderFuthark,
};

// Letters the rune tables don't have, as the nearest ones they do: þ and ð
// were both written with ᚦ (via "th"), accented vowels as the plain vowel.
const EXTRA_LETTERS = { þ: 'th', ð: 'th', á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ý: 'y', ö: 'ø', ä: 'æ' };

function update() {
    // Double spaces keep words apart once they're in runes.
    let inputText = inputElement.value.toLowerCase()
        .replace(/[þðáéíóúýöä]/g, (c) => EXTRA_LETTERS[c])
        .replace(/ /g, '  ');
    if (inputText.trim().length === 0) inputText = 'Futhark';

    for (const [id, alphabet] of Object.entries(outputs)) {
        document.getElementById(id).textContent = alphabet.translate(inputText);
    }
}

for (const button of document.querySelectorAll('.copy')) {
    let timer;
    button.addEventListener('click', async () => {
        const text = document.getElementById(button.dataset.target).textContent;
        try {
            await navigator.clipboard.writeText(text);
            button.textContent = t('copied');
            button.classList.add('done');
        } catch {
            button.textContent = t('copyFailed');
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            button.textContent = t('copy');
            button.classList.remove('done');
        }, 1500);
    });
}

inputElement.addEventListener('input', update);
applyI18n();
update();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}
