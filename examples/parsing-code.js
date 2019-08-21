const BufferJs = require('../index');

const code = `1+2 - 3 * 5 / 823 + 2.501`;
const buffer = new BufferJs(code);

const regexNumbers = /[\d\.]/;
function parseNumbers() {
    let readDot = false;
    const value = buffer.extract(function (c) {
        if (c === '.') {
            if (readDot) {
                return false;
            }
            readDot = true;
        }
        return regexNumbers.test(c);
    }).join('');

    return {
        type: 'number',
        value: parseFloat(value)
    };
}

const regexOperators = /^(?:\+|\-|\*|\/|>|<|(?:>>)|(?:<<))$/;
function parseOperators() {
    let value = '';
    buffer.iterate(function (c) {
        const _possibleMatch = value + c;
        if (!regexOperators.test(_possibleMatch)) {
            return false;
        }
        value = _possibleMatch;
        return true;
    });

    return {
        type: 'operator',
        value
    };
}

const tokens = [];
buffer.forEach(current => {
    if (regexNumbers.test(current)) {
        tokens.push(parseNumbers());
    } else if (regexOperators.test(current)) {
        tokens.push(parseOperators());
    }
});

console.log(tokens);
