const speed = 1.5;
const YAO = ["老陰(6)", "少陽(7)", "少陰(8)", "老陽(9)"];
const desk = document.querySelector("#desk");
const cns = document.querySelector("#console");
document.body.querySelector("style").innerHTML += `.stick { transition: all ${0.8 / speed}s; }`;

async function go() {
    cns.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        let yao = await get_yao();
        let pos = (48 - yao.reduce((a, b) => a + b, 0)) / 4 - 6;
        cns.innerHTML += `[${yao.join(",")}] => ${YAO[pos]}<br>`;
    }
}

async function get_yao() {
    let result = [];
    let data = [
        [], // left
        [], // right
        [], // thrown
        Array.from({ length: 50 }, () => {
            let stick = document.createElement("div");
            stick.classList.add("stick");
            desk.appendChild(stick);
            return stick;
        }),
        [], // outside middle
        [], // outside right
    ];
    move(3, 3);
    await sleep(1000);

    // 代表太極？
    move(3, 4);
    await sleep(1000);

    // 手上拿著？
    move(3, 5);
    await sleep(1000);

    // 隨機左右分配
    await split();
    // 將多的取出
    await modulo();

    // 重新合併
    await merge();

    // 2nd
    move(3, 2);
    await sleep(1000);
    await split();
    await modulo(1);
    await merge();

    // 3rd
    move(3, 2);
    await sleep(1000);
    await split();
    await modulo(1);
    await merge();

    clear();
    return result;

    function clear() {
        [...document.querySelectorAll(".stick")].forEach((stk) => {
            stk.remove();
        });
    }

    async function merge() {
        let l0 = data[0].length,
            l1 = data[1].length;
        for (let i = 0; i < l0; i++) {
            move(0, 3);
            await sleep(100);
        }
        for (let i = 0; i < l1; i++) {
            move(1, 3);
            await sleep(100);
        }
        await sleep(1000);
    }

    async function split() {
        let l3 = data[3].length;
        for (let i = 0; i < l3; i++) {
            move(3, Math.random() < 0.5 ? 0 : 1);
            await sleep(100);
        }
        await sleep(1000);
    }

    async function modulo(pre = 0) {
        let m1 = data[1].length % 4,
            m0 = data[0].length % 4;
        for (let i = 0; i < m1; i++) {
            move(1, 2);
            await sleep(100);
        }
        for (let i = 0; i < m0; i++) {
            move(0, 2);
            await sleep(100);
        }
        result.push((m1 || 4) + (m0 || 4) + pre);
        await sleep(1000);
    }

    function move(a, b) {
        if (data[a].length > 0) {
            let stick = data[a].pop();
            data[b].push(stick);

            const top_margin = 50;
            data[0].forEach((stk, i) => {
                const top = 0,
                    left = 0;
                stk.style.top = top + top_margin + parseInt(i / 12) * 25 + "px";
                stk.style.left = left + (i % 12) * 10 + parseInt(1 + (i % 12) / 4) * 20 + "px";
            });
            data[1].forEach((stk, i) => {
                const top = 0,
                    left = 200;
                stk.style.top = top + top_margin + parseInt(i / 12) * 25 + "px";
                stk.style.left = left + (i % 12) * 10 + parseInt(1 + (i % 12) / 4) * 20 + "px";
            });
            data[2].forEach((stk, i) => {
                const top = 200,
                    left = 0;
                stk.style.top = top + top_margin + parseInt(i / 12) * 25 + "px";
                stk.style.left = left + (i % 12) * 10 + parseInt(1 + (i % 12) / 4) * 20 + "px";
            });
            data[3].forEach((stk, i) => {
                const top = 200,
                    left = 200;
                stk.style.top = top + top_margin + parseInt(i / 12) * 25 + "px";
                stk.style.left = left + (i % 12) * 10 + parseInt(1 + (i % 12) / 4) * 20 + "px";
            });
            data[4].forEach((stk, i) => {
                const top = -50,
                    left = 180;
                stk.style.top = top + parseInt(i / 12) * 25 + "px";
                stk.style.left = left + (i % 12) * 10 + parseInt(1 + (i % 12) / 4) * 20 + "px";
                stk.style.transform = "rotate(90deg)";
            });
            data[5].forEach((stk, i) => {
                const top = -50,
                    left = 380;
                stk.style.top = top + parseInt(i / 12) * 25 + "px";
                stk.style.left = left + (i % 12) * 10 + parseInt(1 + (i % 12) / 4) * 20 + "px";
                stk.style.transform = "rotate(90deg)";
            });

            return true;
        } else return false;
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t / speed));
}
