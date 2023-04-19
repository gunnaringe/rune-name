// Make class for holding the alphabet
class ShortTwig {
    static map = {
        a: 'ᛆ',
        b: 'ᛓ',
        c: 'ᚴ',
        d: 'ᛐ',
        e: 'ᛁ',
        f: 'ᚠ',
        g: 'ᚴ',
        h: 'ᚽ',
        i: 'ᛁ',
        j: 'ᛁ',
        k: 'ᚴ',
        l: 'ᛚ',
        m: 'ᛙ',
        n: 'ᚿ',
<<<<<<< HEAD
        o: 'ᚢ',
=======
        o: 'ᚮ',
>>>>>>> 1c3938d (Initial setup)
        p: 'ᛓ',
        q: 'ᚴ',
        r: 'ᚱ',
        s: 'ᛌ',
        t: 'ᛐ',
        u: 'ᚢ',
        v: 'ᚠ',
        w: 'ᚠ',
        x: 'ᚴ',
<<<<<<< HEAD
        y: 'ᛌ',
=======
        y: 'ᛣ',
>>>>>>> 1c3938d (Initial setup)
        z: 'ᛁ',
        æ: 'ᛆ',
        ø: 'ᚢ',
        å: 'ᚭ',
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

