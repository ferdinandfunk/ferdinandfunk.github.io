const ranges = [5000, 10000, 15000, 20000, 25000, 30000, 35000];
const difficultyMap = new Map();

difficultyMap.set("S1", 0);
difficultyMap.set("S2", 0.5);
difficultyMap.set("S3", 1);
difficultyMap.set("S4", 1.5);
difficultyMap.set("S5", 2);
difficultyMap.set("S6", 2.5);
difficultyMap.set("S7", 3);
difficultyMap.set("S8", 3.5);
difficultyMap.set("S9", 4);
difficultyMap.set("S10", 4.5);
difficultyMap.set("S11", 5.25);
difficultyMap.set("S12", 6);
difficultyMap.set("S13", 6.75);
difficultyMap.set("S14", 7.5);
difficultyMap.set("S15", 8.25);
difficultyMap.set("S16", 9);
difficultyMap.set("S17", 9.75);
difficultyMap.set("S18", 10.5);
difficultyMap.set("S19", 11.25);
difficultyMap.set("S20", 12);
difficultyMap.set("S21", 13);
difficultyMap.set("S22", 14.5);
difficultyMap.set("S23", 16);
difficultyMap.set("S24", 17);
difficultyMap.set("S25", 18);
difficultyMap.set("S26", 19);

difficultyMap.set("D1", 0);
difficultyMap.set("D2", 0.5);
difficultyMap.set("D3", 1);
difficultyMap.set("D4", 1.5);
difficultyMap.set("D5", 2);
difficultyMap.set("D6", 2.5);
difficultyMap.set("D7", 3);
difficultyMap.set("D8", 3.5);
difficultyMap.set("D9", 4);
difficultyMap.set("D10", 4.5);
difficultyMap.set("D11", 5.25);
difficultyMap.set("D12", 6);
difficultyMap.set("D13", 6.75);
difficultyMap.set("D14", 7.5);
difficultyMap.set("D15", 8.25);
difficultyMap.set("D16", 9);
difficultyMap.set("D17", 9.75);
difficultyMap.set("D18", 10.5);
difficultyMap.set("D19", 11.25);
difficultyMap.set("D20", 12);
difficultyMap.set("D21", 13);
difficultyMap.set("D22", 14);
difficultyMap.set("D23", 15);
difficultyMap.set("D24", 16);
difficultyMap.set("D25", 17);
difficultyMap.set("D26", 18);
difficultyMap.set("D27", 19);
difficultyMap.set("D28", 20);
difficultyMap.set("D29", 21);

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
        
        let base = difficultyMap.get(difficulty)
        let rating = 1 + (16.7 * (base + (bonus * (base / 17))));
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
