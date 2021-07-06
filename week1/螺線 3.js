draw();

async function draw() {
    let canvas = document.querySelector("#canvas");
    let WIDTH = canvas.width,
        HEIGHT = canvas.height;

    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;

    const CELL = 100;
    const SIZE = WIDTH / CELL;
    ctx.strokeStyle = "lightgray";
    for (let i = 1; i < CELL; i++) {
        ctx.moveTo(0, SIZE * i);
        ctx.lineTo(WIDTH, SIZE * i);
        ctx.moveTo(SIZE * i, 0);
        ctx.lineTo(SIZE * i, HEIGHT);
        ctx.stroke();
    }

    const c30 = Math.PI * (1 / 6),
        c60 = Math.PI * (1 / 3),
        c90 = Math.PI * (1 / 2),
        c180 = Math.PI;

    const points = [
        [SIZE * 51, SIZE * 50],
        [SIZE * 51, SIZE * 51],
        [SIZE * 50, SIZE * 51],
        [SIZE * 50, SIZE * 50],
    ];

    ctx.fillStyle = "#F59E0B";
    ctx.beginPath();
    ctx.arc(points[0][0], points[0][1], 8, 0, 2 * c180);
    ctx.fill();
    ctx.fillStyle = "#EF4444";
    ctx.beginPath();
    ctx.arc(points[1][0], points[1][1], 8, 0, 2 * c180);
    ctx.fill();
    ctx.fillStyle = "#10B981";
    ctx.beginPath();
    ctx.arc(points[2][0], points[2][1], 8, 0, 2 * c180);
    ctx.fill();
    ctx.fillStyle = "#3B82F6";
    ctx.beginPath();
    ctx.arc(points[3][0], points[3][1], 8, 0, 2 * c180);
    ctx.fill();

    ctx.lineWidth = 5;
    let r = SIZE * 1.5,
        p = 0;
    for (let i = 1; i <= 80; i++) {
        ctx.beginPath();
        switch (p) {
            case 0:
                ctx.strokeStyle = "#F59E0B";
                break;
            case 1:
                ctx.strokeStyle = "#EF4444";
                break;
            case 2:
                ctx.strokeStyle = "#10B981";
                break;
            case 3:
                ctx.strokeStyle = "#3B82F6";
                break;
        }
        ctx.arc(points[p][0], points[p][1], r, (p + 2) * c90, (p + 3) * c90);
        ctx.stroke();
        r += SIZE;
        p = (p + 1) % 4;
        await sleep(200);
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
