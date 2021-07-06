draw();

async function draw(cell = 500) {
    let canvas = document.querySelector("#canvas");
    let WIDTH = canvas.width,
        HEIGHT = canvas.height;

    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    const CELL = cell;
    const SIZE = WIDTH / CELL;
    ctx.lineWidth = 0.5;
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

    ctx.lineWidth = 6;
    let point = [(SIZE * CELL) / 2, (SIZE * CELL) / 2],
        r = SIZE * 2.5;
    for (let i = 1; i <= 10 + CELL / 50; i++) {
        r += SIZE * i;
        let previous = point.slice();
        switch (i % 4) {
            case 1:
                style = "#F59E0B";
                prev_style = "#3B82F6";
                point[1] -= SIZE * i;
                break;
            case 2:
                style = "#EF4444";
                prev_style = "#F59E0B";
                point[0] += SIZE * i;
                break;
            case 3:
                style = "#10B981";
                prev_style = "#EF4444";
                point[1] += SIZE * i;
                break;
            case 0:
                style = "#3B82F6";
                prev_style = "#10B981";
                point[0] -= SIZE * i;
                break;
        }
        ctx.strokeStyle = style;
        ctx.beginPath();
        ctx.moveTo(...previous);
        ctx.lineTo(...point);
        ctx.stroke();

        ctx.fillStyle = prev_style;
        ctx.beginPath();
        ctx.arc(...previous, 8, 0, 2 * c180);
        ctx.fill();

        ctx.fillStyle = style;
        ctx.beginPath();
        ctx.arc(...point, 8, 0, 2 * c180);
        ctx.fill();

        ctx.strokeStyle = style;
        ctx.beginPath();
        ctx.arc(...point, r, i * c90, (i + 1) * c90);
        ctx.stroke();
        await sleep(200);
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
