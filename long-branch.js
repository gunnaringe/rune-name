// Make class for holding the alphabet
class LongBranch {
    static map = {
        a: 'ᛅ',
        b: 'ᛒ',
        c: 'ᚴ',
        d: 'ᛏ',
        e: 'ᛁ',
        f: 'ᚠ',
        g: 'ᚴ',
        h: 'ᚼ',
        i: 'ᛁ',
        j: 'ᛁ',
        k: 'ᚴ',
        l: 'ᛚ',
        m: 'ᛘ',
        n: 'ᚾ',
        o: 'ᚯ',
        p: 'ᛒ',
        q: 'ᚴ',
        r: 'ᚱ',
        s: 'ᛋ',
        t: 'ᛏ',
        u: 'ᚢ',
        v: 'ᚠ',
        w: 'ᚠ',
        x: 'ᚴ',
        y: 'ᛋ',
        z: 'ᛁ',
        æ: 'ᛅ',
        ø: 'ᚢ',
        å: 'ᚯ',
    };

    static replacements = {
        "th": "\u16A6",
    };

    static translate(input) {
        let outputText = '';
        // Make input lowercase
        input = input.toLowerCase();
        // Replace all instances of "th" with "ᚦ"
        for (const [key, value] of Object.entries(this.replacements)) {
            input = input.replace(key, value);
        }
        // Replace each letter with their rune equivalent
        for (const letter of input) {
            if (this.map.hasOwnProperty(letter)) {
                outputText += (this.map)[letter];
            } else {
                outputText += letter;
            }
        }
        return outputText;
    }
}

