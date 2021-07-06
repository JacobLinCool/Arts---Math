draw();

async function draw() {
    let canvas = document.querySelector("#canvas");
    let WIDTH = canvas.width,
        HEIGHT = canvas.height;

    let ctx = canvas.getContext("2d");

    let R = 30;
    const c30 = Math.PI * (1 / 6),
        c60 = Math.PI * (1 / 3),
        c90 = Math.PI * (1 / 2),
        c180 = Math.PI;
    ctx.lineWidth = 3;
    const points = [
        [WIDTH / 2 + (R / Math.pow(3, 0.5)) * Math.cos(-1 * c30), HEIGHT / 2 - (R / Math.pow(3, 0.5)) * Math.sin(-1 * c30)],
        [WIDTH / 2 + (R / Math.pow(3, 0.5)) * Math.cos(c90), HEIGHT / 2 - (R / Math.pow(3, 0.5)) * Math.sin(c90)],
        [WIDTH / 2 + (R / Math.pow(3, 0.5)) * Math.cos(c180 + c30), HEIGHT / 2 - (R / Math.pow(3, 0.5)) * Math.sin(c180 + c30)],
    ];
    ctx.moveTo(points[0][0], points[2][1]);
    ctx.lineTo(points[0][0] + 5000 * Math.cos(c180), points[2][1] - 5000 * Math.sin(c180));
    ctx.moveTo(points[1][0], points[1][1]);
    ctx.lineTo(points[1][0] + 5000 * Math.cos(-1 * c60), points[1][1] - 5000 * Math.sin(-1 * c60));
    ctx.moveTo(points[2][0], points[0][1]);
    ctx.lineTo(points[2][0] + 5000 * Math.cos(c60), points[0][1] - 5000 * Math.sin(c60));
    ctx.stroke();

    let p = 0,
        r = R;
    for (let i = 1; i <= 100; i++) {
        ctx.beginPath();
        switch (p) {
            case 0:
                ctx.arc(points[p][0], points[p][1], r, c60, c180);
                break;
            case 1:
                ctx.arc(points[p][0], points[p][1], r, -1 * c60, c60);
                break;
            case 2:
                ctx.arc(points[p][0], points[p][1], r, c180, c180 + c60 * 2);
                break;
        }
        ctx.stroke();
        r += R;
        p = (p + 1) % 3;
        await sleep(500);
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
