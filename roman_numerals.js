const input = 2021;
console.log(`${input} 的羅馬數字是 ${translate(input)}`);

function translate(n) {
    let num = n;
    let result = "";
    const roman_numerals = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    Object.entries(roman_numerals).forEach(([symbol, value]) => {
        while (num >= value) {
            num -= value;
            result += symbol;
        }
    });

    return result;
}
