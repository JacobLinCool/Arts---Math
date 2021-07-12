const size = 300;
const sqrt2 = Math.pow(2, 0.5);
const desk = document.querySelector("#desk");
const box = document.querySelector("#box");

async function build(n) {
    desk.style.transform = "rotate(0deg)";
    box.style.width = size + "px";
    box.style.height = size + "px";
    box.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    box.style.fontSize = 24 / (n * n) + "rem";
    box.innerHTML = "";
    for (let i = 0; i < n * n; i++) {
        let block = document.createElement("div");
        block.classList.add("block");
        box.appendChild(block);
    }
    [...document.querySelectorAll(".block")].forEach((elm, i) => {
        elm.innerHTML = i + 1;
        elm.style.width = size / n + "px";
        elm.style.height = size / n + "px";
    });
    document.querySelector("#constant").innerHTML = (n * (n * n + 1)) / 2;

    await sleep(1500);
    await rotate();
    await move();

    async function rotate() {
        box.style.width = size * sqrt2 + "px";
        box.style.height = size * sqrt2 + "px";
        [...document.querySelectorAll(".block")].forEach((elm) => {
            elm.classList.add("rotate");
        });
        await sleep(1200);
        desk.style.transform = "rotate(-45deg)";
        await sleep(1200);
    }

    async function move() {
        const distance = size / sqrt2;
        // top
        for (let i = 0; i < n; i++) {
            for (let j = (n + 1) / 2 + i; j < n; j++) {
                document.querySelectorAll(".block")[i * n + j].style.background = "#6EE7B7";
                document.querySelectorAll(".block")[i * n + j].style.top = `${distance}px`;
                document.querySelectorAll(".block")[i * n + j].style.left = `-${distance}px`;
            }
        }
        await sleep(1200);
        // bottom
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < (1 - n) / 2 + i; j++) {
                document.querySelectorAll(".block")[i * n + j].style.background = "#93C5FD";
                document.querySelectorAll(".block")[i * n + j].style.top = `-${distance}px`;
                document.querySelectorAll(".block")[i * n + j].style.left = `${distance}px`;
            }
        }
        await sleep(1200);
        // left
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < (n - 1) / 2 - i; j++) {
                document.querySelectorAll(".block")[i * n + j].style.background = "#FCD34D";
                document.querySelectorAll(".block")[i * n + j].style.top = `${distance}px`;
                document.querySelectorAll(".block")[i * n + j].style.left = `${distance}px`;
            }
        }
        await sleep(1200);
        // right
        for (let i = 0; i < n; i++) {
            for (let j = n - 1 + (n + 1) / 2 - i; j < n; j++) {
                document.querySelectorAll(".block")[i * n + j].style.background = "#FCA5A5";
                document.querySelectorAll(".block")[i * n + j].style.top = `-${distance}px`;
                document.querySelectorAll(".block")[i * n + j].style.left = `-${distance}px`;
            }
        }
        await sleep(1200);
    }
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
