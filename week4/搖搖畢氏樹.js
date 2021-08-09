window.speed = 0.8;

async function draw(magic = 45) {
    const canvas = document.querySelector("#canvas");
    const WIDTH = canvas.width,
        HEIGHT = canvas.height;

    const L = WIDTH / 100;

    let ctx = canvas.getContext("2d");

    const colors = [
        [18, 194, 233],
        [196, 113, 237],
        [247, 121, 125],
    ];

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = "2";

    while (true) {
        magic = (magic + 1) % 360;
        let start = Date.now();
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        let roots = [
            [
                { x: WIDTH * (1 / 2) - 5 * L, y: HEIGHT * (8 / 11) - L },
                { x: WIDTH * (1 / 2) + 5 * L, y: HEIGHT * (8 / 11) - L },
            ],
        ];
        for (let i = 0; i < 6; i++) {
            let newRoots = [];
            for (let j = 0; j < roots.length; j++) {
                const vertex = drawRect({ roots: roots[j], color: `rgb(${calcColor(colors, i / 5)})` });
                newRoots.push([vertex[0], vertex[1]]);
                newRoots.push([vertex[1], vertex[2]]);
            }
            roots = newRoots;
        }
        await sleep(30 / speed - Date.now() + start);
    }

    function drawRect({ roots, color }) {
        // get vectors
        const v1 = [roots[1].x - roots[0].x, roots[1].y - roots[0].y];
        const v2 = [v1[1], v1[0]];

        // draw rectangle
        ctx.beginPath();
        ctx.moveTo(roots[0].x, roots[0].y);
        ctx.lineTo(roots[1].x, roots[1].y);
        ctx.lineTo(roots[1].x + v2[0], roots[1].y - v2[1]);
        ctx.lineTo(roots[0].x + v2[0], roots[0].y - v2[1]);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "lightgray";
        // ctx.stroke();

        // rotate v1 by x degree
        const x = (Math.PI / 180) * magic;
        const v3 = [(v1[0] * Math.cos(x) + v1[1] * Math.sin(x)) * Math.cos(x), (v1[0] * Math.sin(x) - v1[1] * Math.cos(x)) * Math.cos(x)];

        // get triangle vertices
        const vertex = [
            { x: roots[0].x + v2[0], y: roots[0].y - v2[1] },
            { x: roots[0].x + v2[0] + v3[0], y: roots[0].y - v2[1] - v3[1] },
            { x: roots[0].x + v1[0] + v2[0], y: roots[0].y + v1[1] - v2[1] },
        ];

        // draw triangle on the top
        ctx.beginPath();
        ctx.moveTo(vertex[0].x, vertex[0].y);
        ctx.lineTo(vertex[1].x, vertex[1].y);
        ctx.lineTo(vertex[2].x, vertex[2].y);
        ctx.closePath();
        ctx.strokeStyle = "lightgray";
        // ctx.stroke();

        // return vertex of triangle
        return vertex;
    }
}

function calcColor(colors, p) {
    let c2i = 0;
    const c2 = colors.find((c, i) => {
        let r = i / (colors.length - 1) >= p;
        if (r) {
            c2i = i;
            return true;
        }
        return false;
    });
    let c1i = c2i ? c2i - 1 : 0;
    const c1 = colors[c1i];
    const rp = (p - c1i / colors.length) / (1 / (colors.length - 1));
    const w = rp * 2 - 1;
    const w2 = (w / 1 + 1) / 2;
    const w1 = 1 - w2;
    return [Math.round(c1[0] * w1 + c2[0] * w2), Math.round(c1[1] * w1 + c2[1] * w2), Math.round(c1[2] * w1 + c2[2] * w2)];
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
