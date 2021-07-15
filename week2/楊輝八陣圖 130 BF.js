draw();

async function draw() {
    let canvas = document.querySelector("#canvas");
    let WIDTH = canvas.width,
        HEIGHT = canvas.height;

    let ctx = canvas.getContext("2d");
    const SAFE_ZONE = WIDTH / 3;
    const BIG_R = (SAFE_ZONE * 0.7) / 2;
    const SMALL_R = (SAFE_ZONE * 0.2) / 2;

    // Constants about Circle
    const c30 = Math.PI * (1 / 6),
        c60 = Math.PI * (1 / 3),
        c90 = Math.PI * (1 / 2),
        c180 = Math.PI,
        c360 = Math.PI * 2;

    // Numbers
    const YangHui = [
        [9, 24, 40, 57, 8, 25, 41, 56],
        [46, 51, 14, 19, 35, 62, 3, 30],
        [4, 29, 45, 52, 13, 20, 36, 61],
        [1, 32, 48, 49, 16, 17, 33, 64],
        [
            /* 我是中間那個空格 */
        ],
        [12, 21, 37, 60, 5, 28, 44, 53],
        [11, 22, 38, 59, 6, 27, 43, 54],
        [39, 58, 7, 26, 42, 55, 10, 23],
        [2, 31, 47, 50, 15, 18, 34, 63],
    ];
    let pos = new Array(64);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            pos[YangHui[i][j] - 1] = getPos(i, j);
        }
    }

    const colors = ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"];

    // Draw Circles & Numbers
    ctx.lineWidth = 10;
    ctx.strokeStyle = "gray";
    ctx.font = SMALL_R + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i == 1 && j == 1) continue;
            const BIG_X = (0.5 + j) * SAFE_ZONE,
                BIG_Y = (0.5 + i) * SAFE_ZONE;
            for (let k = 0; k < 8; k++) {
                const RLT_X = BIG_R * Math.cos((c360 / 8) * (0.5 + k)),
                    RLT_Y = BIG_R * Math.sin(-1 * (c360 / 8) * (0.5 + k));
                ctx.beginPath();
                ctx.arc(BIG_X + RLT_X, BIG_Y + RLT_Y, SMALL_R, 0, c360);
                ctx.stroke();
                ctx.fillText(YangHui[i * 3 + j][k], BIG_X + RLT_X, BIG_Y + RLT_Y + 10);
            }
        }
    }
    await sleep(1000);

    const result = await calc(
        Array.from({ length: 64 }, (v, i) => i + 1),
        4,
        130
    );
    addToConsole(`找到 ${result.length} 種組合`);

    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 1;
    for (let i = 0; i < result.length; i++) {
        if (!(i % 100)) addToConsole(`已繪製 ${i} 種組合`);
        await sleep(5);
        // console.log(`${result[i].join(" + ")} = 130`);
        ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        ctx.moveTo(...pos[result[i][0] - 1]);
        for (let j = 1; j < result[i].length; j++) {
            ctx.lineTo(...pos[result[i][j] - 1]);
        }
        ctx.closePath();
        ctx.stroke();
    }

    addToConsole("所有組合皆已繪製完成");

    function getPos(big = 0, small = 0) {
        return [
            (0.5 + (big % 3)) * SAFE_ZONE + BIG_R * Math.cos((c360 / 8) * (0.5 + small)),
            (0.5 + parseInt(big / 3)) * SAFE_ZONE + BIG_R * Math.sin(-1 * (c360 / 8) * (0.5 + small)),
        ];
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}

async function calc(source, select, target) {
    source.sort((a, b) => a - b);
    let results = [];
    helper();
    return results;

    function helper(start = 0, sum = 0, prev = []) {
        for (let i = start; i < source.length; i++) {
            let local_sum = sum + source[i];
            if (prev.length === select - 1) {
                if (local_sum === target) results.push(prev.concat(source[i]));
            } else {
                helper(i + 1, local_sum, prev.concat(source[i]));
            }
        }
    }
}

async function addToConsole(message) {
    let console = document.querySelector("#console");
    let span = document.createElement("span");
    span.innerHTML = message;
    console.appendChild(span);
    console.scrollTo(0, -1e6);
}
