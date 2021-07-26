async function draw(n = 5, speed = 1) {
    const canvas = document.querySelector("#canvas");
    const WIDTH = canvas.width,
        HEIGHT = canvas.height;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const colors = ["#2274A5", "#F75C03", "#F1C40F", "#D90368", "#00CC66", "#0E12CF", "#2B164A"];

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    await sleep(500 / speed);
    let center = [{ x: WIDTH / 2, y: HEIGHT / 2 }],
        size = WIDTH / 3;
    drawRect({ ...center[0], size });
    await sleep(1000 / speed);

    for (let i = 1; i < n; i++) {
        const start = Date.now();
        const prev_size = size;
        const prev_center = center;
        size /= 3;
        center = [];
        for (let j = 0; j < prev_center.length; j++) {
            for (let ii = 0; ii < 3; ii++) {
                for (let jj = 0; jj < 3; jj++) {
                    if (ii === 1 && jj === 1) continue;
                    center.push({
                        x: prev_center[j].x + (ii - 1) * prev_size,
                        y: prev_center[j].y + (jj - 1) * prev_size,
                    });
                }
            }
        }
        for (let j = 0; j < center.length; j++) {
            drawRect({ ...center[j], size, color: colors[i % colors.length] });
        }
        await sleep((1000 - Date.now() + start) / speed);
    }

    function drawRect({ x, y, size, color = colors[0] }) {
        ctx.fillStyle = color;
        ctx.fillRect(x - 0.5 * size, y - 0.5 * size, size, size);
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
