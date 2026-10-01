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
        æ: 'ᛖ',
        ø: 'ᛟ',
        å: 'ᚨ',
    };

    static replacements = {
        "th": "ᚦ",
        "ng": "ᛜ",
    };

    static translate(input) {
        let outputText = '';
        // Make input lowercase
        input = input.toLowerCase();
        // Letter pairs with a rune of their own, like "th" -> "ᚦ"
        for (const [key, value] of Object.entries(this.replacements)) {
            input = input.replaceAll(key, value);
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
