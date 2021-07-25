async function draw(n = 3, speed = 1) {
    const canvas = document.querySelector("#canvas");
    const WIDTH = canvas.width,
        HEIGHT = canvas.height;

    const L = WIDTH / 100;

    let ctx = canvas.getContext("2d");
    // Constants about Circle
    const c30 = Math.PI * (1 / 6),
        c60 = Math.PI * (1 / 3),
        c90 = Math.PI * (1 / 2),
        c180 = Math.PI,
        c360 = Math.PI * 2;

    const colors = ["#2274A5", "#F75C03", "#F1C40F", "#D90368", "#00CC66", "#0E12CF", "#2B164A"];

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 1; i <= parseInt((n - 1) / 2); i++) {
        ctx.lineWidth = 8;
        drawRect();

        const center = [(30 + 40 * (i / n)) * L, (30 + 40 * (1 - i / n)) * L];

        ctx.fillStyle = colors[1];
        ctx.beginPath();
        ctx.arc(center[0], 35 * L, 10, 0, c360);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(center[1], 35 * L, 10, 0, c360);
        ctx.fill();

        ctx.strokeStyle = colors[1];
        ctx.beginPath();
        ctx.arc(center[0], 35 * L, 40 * L * (1 - i / n), c180 + c90, c360);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center[1], 35 * L, 40 * L * (1 - i / n), c180, c180 + c90);
        ctx.stroke();

        ctx.lineWidth = 300;
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.arc(center[0], 35 * L, 40 * L * (1 - i / n) + 154, c180 + c90, c360);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center[1], 35 * L, 40 * L * (1 - i / n) + 154, c180, c180 + c90);
        ctx.stroke();

        await sleep(1500 / speed);
    }

    function drawRect() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.strokeStyle = colors[0];
        ctx.strokeRect(30 * L, 35 * L, 40 * L, 60 * L);
        for (let i = 1; i < n; i++) {
            ctx.fillStyle = colors[2];
            ctx.beginPath();
            ctx.arc((30 + 40 * (i / n)) * L, 35 * L, 10, 0, c360);
            ctx.fill();
        }
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
