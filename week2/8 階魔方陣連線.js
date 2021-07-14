draw();

async function draw() {
    let canvas = document.querySelector("#canvas");
    let WIDTH = canvas.width,
        HEIGHT = canvas.height;

    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 10;

    const CELL = 8;
    const SIZE = WIDTH / CELL;
    ctx.strokeStyle = "lightgray";
    for (let i = 1; i < CELL; i++) {
        ctx.moveTo(0, SIZE * i);
        ctx.lineTo(WIDTH, SIZE * i);
        ctx.moveTo(SIZE * i, 0);
        ctx.lineTo(SIZE * i, HEIGHT);
        ctx.stroke();
    }

    const numbers = `52	61	4	13	20	29	36	45
    14	3	62	51	46	35	30	19
    53	60	5	12	21	28	37	44
    11	6	59	54	43	38	27	22
    55	58	7	10	23	26	39	42
    9	8	57	56	41	40	25	24
    50	63	2	15	18	31	34	47
    16	1	64	49	48	33	32	17`
        .split("\n")
        .map((x) => x.split("\t").map(Number));
    const positions = new Array(8 * 8);

    ctx.font = "200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            ctx.fillText(numbers[i][j], (0.5 + j) * SIZE, (0.5 + i) * SIZE);
            positions[numbers[i][j] - 1] = [j, i];
        }
    }

    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    const colors = [
        [18, 194, 233],
        [196, 113, 237],
        [247, 121, 125],
    ];
    for (let i = 1; i < 8 * 8; i++) {
        await sleep(80);
        const pos = Math.min(i, 64 - i),
            min = 1,
            max = 32;
        let interval = max - min;
        let abs_pos = (pos - min) / interval;
        let color2_index = 0;
        let color2 = colors.find((c, i) => {
            let r = i / (colors.length - 1) >= abs_pos;
            if (r) {
                color2_index = i;
                return true;
            }
            return false;
        });
        let color1_index = color2_index ? color2_index - 1 : 0;
        let color1 = colors[color1_index];
        let rel_pos = (abs_pos - color1_index / colors.length) / (1 / (colors.length - 1));

        const color = `rgb(${calcColor(color1, color2, rel_pos).join(",")})`;

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo((0.5 + positions[i - 1][0]) * SIZE, (0.5 + positions[i - 1][1]) * SIZE);
        ctx.lineTo((0.5 + positions[i][0]) * SIZE, (0.5 + positions[i][1]) * SIZE);
        ctx.stroke();
    }
}

function calcColor(c1, c2, p) {
    const w = p * 2 - 1;
    const w2 = (w / 1 + 1) / 2;
    const w1 = 1 - w2;
    return [Math.round(c1[0] * w1 + c2[0] * w2), Math.round(c1[1] * w1 + c2[1] * w2), Math.round(c1[2] * w1 + c2[2] * w2)];
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
