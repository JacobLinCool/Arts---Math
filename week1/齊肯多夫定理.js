let input = 2021;
console.log(`${input} = ${calc(input).join(" + ")}`);

function calc(n) {
    let fibonacci = [1, 1];
    while (fibonacci[fibonacci.length - 1] < n) {
        fibonacci.push(fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]);
    }
    if (fibonacci[fibonacci.length - 1] === n) fibonacci.pop();

    let result = [];
    while (n > 0) {
        if (n <= 2) {
            result.push(n);
            n = 0;
        } else {
            while (fibonacci.length && fibonacci[fibonacci.length - 1] >= n) fibonacci.pop();

            result.push(fibonacci[fibonacci.length - 1]);
            n -= fibonacci[fibonacci.length - 1];
            fibonacci.pop();
        }
    }
    return result;
}
