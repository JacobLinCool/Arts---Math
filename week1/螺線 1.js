draw();

async function draw() {
    let canvas = document.querySelector("#canvas");
    let WIDTH = canvas.width,
        HEIGHT = canvas.height;

    let ctx = canvas.getContext("2d");

    ctx.lineWidth = 6;
    ctx.moveTo(0, HEIGHT / 2);
    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();

    let center = [WIDTH / 2, HEIGHT / 2];
    let side = true;
    let r = 30;
    for (let i = 1; i <= 8; i++) {
        ctx.beginPath();
        ctx.arc(center[0], center[1], r, side ? Math.PI : 0, side ? 0 : Math.PI);
        ctx.stroke();
        center[0] += (side ? -1 : 1) * r;
        r = r * 2;
        side = !side;
        await sleep();
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
