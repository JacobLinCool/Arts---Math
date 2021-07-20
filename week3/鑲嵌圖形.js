draw();

async function draw() {
    const canvas = document.querySelector("#canvas");
    const WIDTH = canvas.width,
        HEIGHT = canvas.height;

    const multiplying = 1;
    const SIZE = 100 * multiplying;
    const CELL = WIDTH / SIZE;

    let ctx = canvas.getContext("2d");
    // Constants about Circle
    const c30 = Math.PI * (1 / 6),
        c60 = Math.PI * (1 / 3),
        c90 = Math.PI * (1 / 2),
        c180 = Math.PI,
        c360 = Math.PI * 2;

    const colors = ["#ad633b", "#d46f39", "#b0725d", "#964f29", "#00CC66", "#0E12CF", "#2B164A"];

    ctx.lineWidth = 2 * multiplying;
    ctx.strokeStyle = "#eee";
    ctx.lineCap = "round";
    for (let i = -CELL; i <= CELL; i++) {
        for (let j = -CELL; j <= CELL * 2; j++) {
            single(i * SIZE + j * SIZE * 0.3, j * SIZE * 0.7);
        }
    }

    ctx.strokeStyle = "#ffea4d";
    ctx.beginPath();
    ctx.moveTo(105 * multiplying, 5 * multiplying);
    ctx.lineTo(145 * multiplying, 5 * multiplying);
    ctx.lineTo(145 * multiplying, 30 * multiplying);
    ctx.lineTo(195 * multiplying, 30 * multiplying);
    ctx.lineTo(195 * multiplying, 45 * multiplying);
    ctx.lineTo(210 * multiplying, 45 * multiplying);
    ctx.lineTo(210 * multiplying, 90 * multiplying);
    ctx.lineTo(200 * multiplying, 90 * multiplying);
    ctx.lineTo(200 * multiplying, 100 * multiplying);
    ctx.lineTo(175 * multiplying, 100 * multiplying);
    ctx.lineTo(175 * multiplying, 75 * multiplying);
    ctx.lineTo(135 * multiplying, 75 * multiplying);
    ctx.lineTo(135 * multiplying, 100 * multiplying);
    ctx.lineTo(100 * multiplying, 100 * multiplying);
    ctx.lineTo(100 * multiplying, 90 * multiplying);
    ctx.lineTo(110 * multiplying, 90 * multiplying);
    ctx.lineTo(110 * multiplying, 45 * multiplying);
    ctx.lineTo(95 * multiplying, 45 * multiplying);
    ctx.lineTo(95 * multiplying, 30 * multiplying);
    ctx.lineTo(105 * multiplying, 30 * multiplying);
    ctx.lineTo(105 * multiplying, 5 * multiplying);
    ctx.stroke();

    function single(x, y) {
        ctx.lineWidth = 2 * multiplying;
        ctx.strokeStyle = "#eee";
        ctx.lineCap = "round";

        // 尾巴
        ctx.fillStyle = colors[2];
        ctx.fillRect(x * multiplying, (y + 45) * multiplying, 10 * multiplying, 55 * multiplying);
        ctx.strokeRect(x * multiplying, (y + 45) * multiplying, 10 * multiplying, 55 * multiplying);

        // 身體
        ctx.fillStyle = colors[0];
        ctx.strokeRect(x * multiplying, (y + 90) * multiplying, 20 * multiplying, 10 * multiplying);
        ctx.fillRect((x + 10) * multiplying, (y + 30) * multiplying, 90 * multiplying, 70 * multiplying);
        ctx.strokeRect((x + 10) * multiplying, (y + 30) * multiplying, 90 * multiplying, 70 * multiplying);
        ctx.fillRect((x + 1) * multiplying, (y + 91) * multiplying, 10 * multiplying, 8 * multiplying);

        // 頭
        ctx.fillStyle = colors[1];
        ctx.fillRect((x - 5) * multiplying, (y + 5) * multiplying, 50 * multiplying, 40 * multiplying);
        ctx.strokeRect((x - 5) * multiplying, (y + 5) * multiplying, 50 * multiplying, 40 * multiplying);
        ctx.fillStyle = colors[0];
        ctx.fillRect((x - 5) * multiplying, (y + 5) * multiplying, 10 * multiplying, 25 * multiplying);
        ctx.strokeRect((x - 5) * multiplying, (y + 5) * multiplying, 10 * multiplying, 25 * multiplying);

        // 眼
        ctx.lineWidth = 5 * multiplying;
        ctx.fillStyle = "#ffb994";
        ctx.beginPath();
        ctx.arc((x + 15) * multiplying, (y + 18) * multiplying, 4 * multiplying, 0, c360);
        ctx.fill();

        // 耳朵
        ctx.lineWidth = 2 * multiplying;
        ctx.fillStyle = colors[3];
        ctx.fillRect((x + 30) * multiplying, (y + 6) * multiplying, 10 * multiplying, 15 * multiplying);
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
