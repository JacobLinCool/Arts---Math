window.speed = 10;
draw();

async function draw(deg = 20) {
    const canvas = document.querySelector("#canvas");
    const WIDTH = canvas.width,
        HEIGHT = canvas.height;

    const L = WIDTH / 100;

    let ctx = canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 0.2 * L;
    
    drawTriangle();
    await sleep(1000);
    while (deg < 60) {
        drawTriangle();
        deg += 0.1;
        await sleep(50 / speed);
    }
    await sleep(1000);

    function drawTriangle() {
        const size = 40;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        const x = WIDTH / 2 - (size - 10) * L;
        const y = HEIGHT / 2;
        // draw triangle
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size * 1.5 * L, y - size * 1.5 * L * Math.tan(((deg / 180) * Math.PI) / 2));
        ctx.lineTo(x + size * 1.5 * L, y - size * 1.5 * L * Math.tan((-(deg / 180) * Math.PI) / 2));
        ctx.closePath();
        ctx.stroke();

        ctx.font = `${3 * L}px Arial`;
        ctx.fillText(`${deg.toFixed(0)}°`, x - 3 * L, y - 3 * L);
        ctx.fillText(`${((180 - deg) / 2).toFixed(0)}°`, x + size * 1.5 * L + L, y - size * 1.5 * L * Math.tan(((deg / 180) * Math.PI) / 2));
        ctx.fillText(`${((180 - deg) / 2).toFixed(0)}°`, x + size * 1.5 * L + L, y - size * 1.5 * L * Math.tan((-(deg / 180) * Math.PI) / 2));
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
