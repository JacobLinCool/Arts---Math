const floor = 20;
console.log(`${floor} 階樓梯有 ${run(floor)} 種走法`);

function run(n) {
    let dp = new Array(n).fill(0);

    dp[0] = 1;
    dp[1] = 2;
    for (let i = 2; i < n; i++) dp[i] = dp[i - 1] + dp[i - 2];

    return dp[n - 1];
}
