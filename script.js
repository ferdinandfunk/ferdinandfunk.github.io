const ranges = [10000, 20000, 20000, 25000, 25000, 100000];
const difficultyMap = new Map();

difficultyMap.set("S1", 0);
difficultyMap.set("S2", 1);
difficultyMap.set("S3", 2);
difficultyMap.set("S4", 3);
difficultyMap.set("S5", 4);
difficultyMap.set("S6", 5);
difficultyMap.set("S7", 6);
difficultyMap.set("S8", 7);
difficultyMap.set("S9", 8);
difficultyMap.set("S10", 9);
difficultyMap.set("S11", 10);
difficultyMap.set("S12", 11);
difficultyMap.set("S13", 12);
difficultyMap.set("S14", 13);
difficultyMap.set("S15", 14);
difficultyMap.set("S16", 15);
difficultyMap.set("S17", 16);
difficultyMap.set("S18", 17);
difficultyMap.set("S19", 18);
difficultyMap.set("S20", 19);
difficultyMap.set("S21", 20);
difficultyMap.set("S22", 21.5);
difficultyMap.set("S23", 23);
difficultyMap.set("S24", 24);
difficultyMap.set("S25", 25);
difficultyMap.set("S26", 26);

difficultyMap.set("D1", 0);
difficultyMap.set("D2", 1);
difficultyMap.set("D3", 2);
difficultyMap.set("D4", 3);
difficultyMap.set("D5", 4);
difficultyMap.set("D6", 5);
difficultyMap.set("D7", 6);
difficultyMap.set("D8", 7);
difficultyMap.set("D9", 8);
difficultyMap.set("D10", 9);
difficultyMap.set("D11", 10);
difficultyMap.set("D12", 11);
difficultyMap.set("D13", 12);
difficultyMap.set("D14", 13);
difficultyMap.set("D15", 14);
difficultyMap.set("D16", 15);
difficultyMap.set("D17", 16);
difficultyMap.set("D18", 17);
difficultyMap.set("D19", 18);
difficultyMap.set("D20", 19);
difficultyMap.set("D21", 20);
difficultyMap.set("D22", 21);
difficultyMap.set("D23", 22);
difficultyMap.set("D24", 23);
difficultyMap.set("D25", 24);
difficultyMap.set("D26", 25);
difficultyMap.set("D27", 26);
difficultyMap.set("D28", 27);
difficultyMap.set("D29", 28);

function mapNN(value) {
    value = value < 0 ? 0 : value;
    return value > 1 ? 1 : value;
}

function sumArr(arr) {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
}

function getRating(reader) {
    const scores = reader.result.split("\n");
    let newScores = [];
    for (const curScore of scores) {
        if (!curScore) continue;

        let t1 = curScore.split('"');
        if (t1.length == 1) continue;

        let t = t1[0].split(",")
        if (t[3] == "True") continue;

        let difficulty = t[0];
        if (!difficultyMap.has(difficulty)) continue;

        let name  = t[2];
        let score = Number(t1[1].replaceAll(",", ""));
        if (!score) continue;

        let bonus = 0;
        for (let i = 0; i < ranges.length; i++) {
            bonus += mapNN((score - (1000000 - sumArr(ranges.slice(0, i + 1)))) / ranges[i]);
        }
        
        let rating = 1 + (13.5 * (difficultyMap.get(difficulty) + bonus));
        rating = rating.toFixed(2);
        newScores.push([rating, `${difficulty}, ${name}, Score: ${score}, Aura Rating: ${rating}\n`]);
    }
    const sortedScores = newScores.sort((a, b) => b[0] - a[0]);

    let output = "";
    let total = 0;
    for (let i = 0; i < 50; i++) {
        output += `${i + 1}: ${sortedScores[i][1]}`;
        total += Number(sortedScores[i][0]);
    }
    ratingTotal.innerText = `Total Rating: ${total.toFixed(2)}\n${output}`;
}

var hiddenBtn = document.getElementById('hiddenBtn');
var ratingTotal = document.getElementById('ratingTotal');

hiddenBtn.addEventListener('change', () => {
    const file = hiddenBtn.files?.[0];
    if (!file) return;

    const reader = new FileReader()
    reader.addEventListener("load", () => {getRating(reader)});
    reader.readAsText(file, 'UTF-8');
});
