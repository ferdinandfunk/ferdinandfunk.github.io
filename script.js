const ranges = [5000, 10000, 15000, 20000, 25000, 30000, 35000];
const difficultyMap = new Map();

const titles = ["Intermediate 1", "Intermediate 2", "Intermediate 3", "Intermediate 4", "Intermediate 5", "Intermediate 6", "Intermediate 7", "Intermediate 8", "Intermediate 9", "Intermediate 10", "Advanced 1", "Advanced 2", "Advanced 3", "Advanced 4", "Advanced 5", "Advanced 6", "Advanced 7", "Advanced 8", "Advanced 9", "Advanced 10", "Expert 1", "Expert 2", "Expert 3", "Expert 4", "Expert 5", "Expert 6", "Expert 7", "Expert 8", "Expert 8", "Expert 10", "Master"];
const doublesTitles = [5000, 5700, 6400, 7100, 7800, 8500, 9200, 9900, 10600, 11300, 12000, 12250, 12500, 12750, 13000, 13250, 13500, 13750, 14000, 14250, 14500, 14950, 15400, 15850, 16300, 16750, 17200, 17650, 18100, 18550, 19000];
const singlesTitles = [5000, 5700, 6400, 7100, 7800, 8500, 9200, 9900, 10600, 11300, 12000, 12250, 12500, 12750, 13000, 13250, 13500, 13750, 14000, 14250, 14500, 14900, 15300, 15700, 16100, 16500, 16900, 17300, 17700, 18100, 18500];

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

function calcRating(score, difficulty) {
    let bonus = 0;
    let base = difficultyMap.get(difficulty);
    for (let i = 0; i < ranges.length; i++) {
        bonus += mapNN((score - (1000000 - sumArr(ranges.slice(0, i + 1)))) / ranges[i]);
    }
    return rating = 1 + (16.7 * (base + (bonus * (base / 17))));
}

function getRating(reader) {
    const scores = reader.result.split("\n");
    let newScores = [];
    let newSingles = [];
    let newDoubles = [];

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

        let rating = calcRating(score, difficulty).toFixed(2);
        let formatedScore = [rating, `${difficulty}, ${name}, Score: ${score}, Aura Rating: ${rating}\n`];
        newScores.push(formatedScore);

        if (difficulty[0] == "S") {
            newSingles.push(formatedScore);
        } else {
            newDoubles.push(formatedScore);
        }
    }
    const sortedScores = newScores.sort((a, b) => b[0] - a[0]);
    const sortedSingles = newSingles.sort((a, b) => b[0] - a[0]);
    const sortedDoubles = newDoubles.sort((a, b) => b[0] - a[0]);

    let totalList = "";
    let singlesList = "";
    let doublesList = "";

    let totalRating = 0;
    let singlesRating = 0;
    let doublesRating = 0;

    for (let i = 0; i < 50; i++) {
        totalList += `${i + 1}: ${sortedScores[i][1]}`;
        singlesList += `${i + 1}: ${sortedSingles[i][1]}`;
        doublesList += `${i + 1}: ${sortedDoubles[i][1]}`;

        totalRating += Number(sortedScores[i][0]);
        singlesRating += Number(sortedSingles[i][0]);
        doublesRating += Number(sortedDoubles[i][0]);
    }

    let singlesTitle = "Beginner";
    let doublesTitle = "Beginner";
    for (let i = 0; i < titles.length; i++) {
        if (singlesRating >=  singlesTitles[i]) singlesTitle = titles[i];
        if (doublesRating >=  doublesTitles[i]) doublesTitle = titles[i];
    }

    ratingTotal.innerText = `Total Rating: ${totalRating.toFixed(2)}\n${totalList}\nDoubles Rating: ${doublesRating.toFixed(2)}, (Double ${doublesTitle})\n${doublesList}\nSingles Rating: ${singlesRating.toFixed(2)}, (Single ${singlesTitle})\n${singlesList}`;
}

var hiddenBtn = document.getElementById('hiddenBtn');
var ratingTotal = document.getElementById('ratingTotal');

let testDifficulty = "S22";
let testScore = 960000;
ratingTotal.innerText = `50 ${testScore}'s at ${testDifficulty} is ${50 * calcRating(testScore, testDifficulty).toFixed(2)}`;

hiddenBtn.addEventListener('change', () => {
    const file = hiddenBtn.files?.[0];
    if (!file) return;

    const reader = new FileReader()
    reader.addEventListener("load", () => {getRating(reader)});
    reader.readAsText(file, 'UTF-8');
});
