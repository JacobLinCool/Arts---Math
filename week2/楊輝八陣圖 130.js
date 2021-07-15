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

    const colors = ["#2274A5", "#F75C03", "#F1C40F", "#D90368", "#00CC66", "#0E12CF", "#2B164A"];

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

    // ()
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.globalAlpha = 0.6;
    for (let k = 0; k < 8; k += 2) {
        await sleep(1500);
        ctx.strokeStyle = colors[k / 2];
        let RLT = [];
        switch (k) {
            case 0:
                RLT = [0, 30];
                break;
            case 2:
                RLT = [-30, 0];
                break;
            case 4:
                RLT = [0, -30];
                break;
            case 6:
                RLT = [30, 0];
                break;
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i == 1 && j == 1) continue;
                await sleep(200);
                const BIG_X = (0.5 + j) * SAFE_ZONE,
                    BIG_Y = (0.5 + i) * SAFE_ZONE;
                ctx.beginPath();
                ctx.arc(BIG_X + RLT[0], BIG_Y + RLT[1], BIG_R, (c360 / 8) * (k + 0.5), (c360 / 8) * (k - 0.5) + c180);
                ctx.stroke();
            }
        }
    }

    // []
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.globalAlpha = 0.6;
    for (let k = 0; k < 2; k++) {
        await sleep(1500);
        ctx.strokeStyle = colors[k ? 4 : 5];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i == 1 && j == 1) continue;
                await sleep(200);
                const BIG_X = (0.5 + j) * SAFE_ZONE,
                    BIG_Y = (0.5 + i) * SAFE_ZONE;
                const WIDTH = k ? 2 * BIG_R : BIG_R,
                    HEIGHT = k ? BIG_R : 2 * BIG_R;

                roundRect(BIG_X - WIDTH / 2, BIG_Y - HEIGHT / 2, WIDTH, HEIGHT);
            }
        }
    }

    // centre []
    ctx.strokeStyle = colors[6];
    await sleep(1500);
    roundRect(getPos(1, 5)[0], getPos(1, 5)[1], getPos(1, 6)[0] - getPos(1, 5)[0], getPos(7, 2)[1] - getPos(1, 5)[1]);
    await sleep(200);
    roundRect(getPos(3, 0)[0], getPos(3, 0)[1], getPos(5, 3)[0] - getPos(3, 0)[0], getPos(3, 7)[1] - getPos(3, 0)[1]);

    function roundRect(x, y, width, height) {
        const radius = 30;

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.stroke();
    }

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
