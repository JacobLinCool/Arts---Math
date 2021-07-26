async function draw(n = 100000, size = 1, speed = 10000) {
    const canvas = document.querySelector("#canvas");
    const WIDTH = canvas.width,
        HEIGHT = canvas.height;

    const L = WIDTH / 100;
    const SIZE = 45 * L;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // Constants about Circle
    const c30 = Math.PI * (1 / 6),
        c60 = Math.PI * (1 / 3),
        c90 = Math.PI * (1 / 2),
        c180 = Math.PI,
        c360 = Math.PI * 2;

    const colors = ["#2274A5", "#F75C03", "#F1C40F", "#D90368", "#00CC66", "#0E12CF", "#2B164A"];

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };
    const P1 = { x: CENTER.x + Math.cos(c90) * SIZE, y: CENTER.y - Math.sin(c90) * SIZE };
    const P2 = { x: CENTER.x + Math.cos(c180 + c30) * SIZE, y: CENTER.y - Math.sin(c180 + c30) * SIZE };
    const P3 = { x: CENTER.x + Math.cos(c360 - c30) * SIZE, y: CENTER.y - Math.sin(c360 - c30) * SIZE };

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(WIDTH, 0);
    ctx.lineWidth = L;
    ctx.strokeStyle = "#cadce8";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(P1.x, P1.y);
    ctx.lineTo(P2.x, P2.y);
    ctx.lineTo(P3.x, P3.y);
    ctx.closePath();
    ctx.fillStyle = "#f5f8fa";
    ctx.fill();
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 0.3 * L;
    ctx.stroke();

    let outers = [P1, P2, P3];
    let inner = getRandomPoint();
    drawPoint({ ...inner, color: colors[1] });

    const speedA = speed / 100,
        speedB = speed % 100;
    for (let i = 0; i < n; i++) {
        let outer = outers[Math.floor(Math.random() * 3)];
        let middle = getMiddlePoint(outer, inner);
        drawPoint({ ...middle, size: (size / 20) * L });
        inner = middle;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo((WIDTH * i) / n, 0);
        ctx.lineWidth = L;
        ctx.stroke();

        if (i % speedA === 0) await sleep(100 / speedB);
    }

    function getMiddlePoint(p1, p2) {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
        };
    }

    function drawPoint({ x, y, color = colors[0], sze = (size / 10) * L }) {
        ctx.beginPath();
        ctx.arc(x, y, sze, 0, c360);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function getRandomPoint() {
        const xp = Math.random(),
            yp = Math.random();
        const l = P3.x - P2.x;
        const h = (1 - 2 * Math.abs(xp - 0.5)) * l * 0.5 * Math.pow(3, 0.5);
        const x = P2.x + l * xp,
            y = P2.y - h * yp;
        return { x, y };
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
