const size = 300;
const box = document.querySelector("#box");

async function build(n) {
    const k = n / 4;
    box.style.width = size + "px";
    box.style.height = size + "px";
    box.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    box.style.fontSize = 8 / n + "rem";
    box.innerHTML = "";
    for (let i = 0; i < n * n; i++) {
        let block = document.createElement("div");
        block.classList.add("block");
        box.appendChild(block);
    }
    const blocks = [...document.querySelectorAll(".block")];
    blocks.forEach((elm, i) => {
        elm.style.width = size / n + "px";
        elm.style.height = size / n + "px";
    });
    document.querySelector("#constant").innerHTML = (n * (n * n + 1)) / 2;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (isColored(i, j)) {
                blocks[i * n + j].style.background = "#FDE68A";
                blocks[i * n + j].style.transform = "rotate(180deg)";
            }
        }
    }

    await sleep(1000);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!isColored(i, j)) {
                await sleep(1000 / n);
                blocks[i * n + j].innerHTML = i * n + j + 1;
            }
        }
    }
    await sleep(300);
    box.style.transform = "rotate(180deg)";
    await sleep(1000);

    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (isColored(i, j)) {
                await sleep(1000 / n);
                blocks[i * n + j].innerHTML = n * n - (i * n + j);
            }
        }
    }
    await sleep(300);
    box.style.transform = "rotate(0deg)";
    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (isColored(i, j)) {
                blocks[i * n + j].style.transform = "rotate(0deg)";
            }
        }
    }
    await sleep(1000);

    function isColored(i, j) {
        return (
            (n - i > k && i >= k && j < k) || // left
            (n - i > k && i >= k && n - j <= k) || // right
            (n - j > k && j >= k && i < k) || // top
            (n - j > k && j >= k && n - i <= k) // bottom
        );
    }

    await sleep(1500);
}

function sleep(t = 1000) {
    return new Promise((r) => setTimeout(r, t));
}
