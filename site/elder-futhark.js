// Make class for holding the alphabet
class ElderFuthark {
    static map = {
        a: 'ᚨ',
        b: 'ᛒ',
        c: 'ᚲ',
        d: 'ᛞ',
        e: 'ᛖ',
        f: 'ᚠ',
        g: 'ᚷ',
        h: 'ᚺ',
        i: 'ᛁ',
        j: 'ᛃ',
        k: 'ᚲ',
        l: 'ᛚ',
        m: 'ᛗ',
        n: 'ᚾ',
        o: 'ᛟ',
        p: 'ᛈ',
        q: 'ᚲ',
        r: 'ᚱ',
        s: 'ᛊ',
        t: 'ᛏ',
        u: 'ᚢ',
        v: 'ᚹ',
        w: 'ᚹ',
        x: 'ᚲᛊ',
        y: 'ᛃ',
        z: 'ᛉ',
        æ: 'ᛅᛁ',
        ø: 'ᛟᚢ',
        å: 'ᛅ',
    };

    static replacements = {
        "th": "ᚦ",
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
