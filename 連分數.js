// 可以發現，當 depth 增加時，該連分數會接近於黃金比例 1.6180339887498948
const depth = 50;
console.log(`深度 ${depth}: ${calc(depth)}`);

function calc(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    let fraction = 3 / 2;
    for (let i = 4; i <= n; i++) {
        fraction = 1 + 1 / fraction;
    }

    return fraction;
}
