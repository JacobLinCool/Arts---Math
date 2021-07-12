const size = 300;
const sqrt2 = Math.pow(2, 0.5);
const desk = document.querySelector("#desk");
const box = document.querySelector("#box");
box.style.width = size + "px";
box.style.height = size + "px";
[...document.querySelectorAll(".block")].forEach((elm, i) => {
    elm.innerHTML = i + 1;
    elm.style.width = size / 3 + "px";
    elm.style.height = size / 3 + "px";
});

(async () => {
    await sleep(2000);
    await rotate();
    await move();
})();

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
    block(3).style.top = `${distance}px`;
    block(3).style.left = `-${distance}px`;
    await sleep(1200);
    block(7).style.top = `-${distance}px`;
    block(7).style.left = `${distance}px`;
    await sleep(1200);
    block(1).style.top = `${distance}px`;
    block(1).style.left = `${distance}px`;
    await sleep(1200);
    block(9).style.top = `-${distance}px`;
    block(9).style.left = `-${distance}px`;
    await sleep(1200);
}

function block(n) {
    return document.querySelectorAll(".block")[n - 1];
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
