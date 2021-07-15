run();

async function run() {
    console.time("130");
    let source = Array.from({ length: 64 }, (v, i) => i + 1);
    let results = await calc(source, 5, 130);
    console.log(results);
    console.log(results.length);
    console.timeEnd("130");
}

async function calc(source, select, target) {
    console.log(`開始計算 \nMATRIX: [${source.join(", ")}] \nSELECT: ${select} \nTARGET: ${target}`);
    source.sort((a, b) => a - b);
    let results = [];
    helper();
    return results;

    function helper(start = 0, sum = 0, prev = []) {
        for (let i = start; i < source.length; i++) {
            let local_sum = sum + source[i];
            if (prev.length === select - 1) {
                if (local_sum === target) results.push(prev.concat(source[i]));
            } else {
                helper(i + 1, local_sum, prev.concat(source[i]));
            }
        }
    }
}
