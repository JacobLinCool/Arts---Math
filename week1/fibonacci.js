const max = 24;

let rabits = [0, 1];
console.log(
    `第 ${"1".padStart(3, " ")} 個月時有 ${String(rabits[0]).padStart(5, " ")} 隻大兔子 + ${String(rabits[1]).padStart(5, " ")} 隻小兔子 = ${String(
        rabits[0] + rabits[1]
    ).padStart(5, " ")} 隻兔子`
);
for (let i = 2; i <= max; i++) {
    [rabits[0], rabits[1]] = [rabits[0] + rabits[1], rabits[0]];
    console.log(
        `第 ${String(i).padStart(3, " ")} 個月時有 ${String(rabits[0]).padStart(5, " ")} 隻大兔子 + ${String(rabits[1]).padStart(5, " ")} 隻小兔子 = ${String(
            rabits[0] + rabits[1]
        ).padStart(5, " ")} 隻兔子`
    );
}
