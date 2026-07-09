let player = {
    score: new Decimal(0),
    generators: [
        {
            initialCost: new Decimal(10),
            costMultiplier: new Decimal(1.1), // maybe i'll scrap this and switch into 10-buy mode, but we'll see that
            totalAmount: new Decimal(0),
            timesBought: 0,
        },
        {
            initialCost: new Decimal(100),
            costMultiplier: new Decimal(1.2), // again, i'll have to think about this
            totalAmount: new Decimal(0),
            timesBought: 0,
        },
    ],
};

function increment() {
    player.score = player.score.plus(1);

    updateUI();
}

function totalGeneratorCost(id) {
    const gen = player.generators[id - 1]

    return gen.initialCost.mul(Decimal.pow(gen.costMultiplier, gen.timesBought));
}

function buyGenerator(id) {
    if (id < 1 || id > 2) throw new RangeError("Generator id must be an number from 1-2!");

    const totalCost = totalGeneratorCost(id);
    const gen = player.generators[id - 1];

    if (player.score.gte(totalCost) && gen.timesBought <= Number.MAX_SAFE_INTEGER) {
        player.score = player.score.sub(totalCost);

        gen.totalAmount = gen.totalAmount.plus(1);
        gen.timesBought++;

        updateUI();
    }
}

function getNumericPositionString(num) {
    if (num == 1) return "1st";
    else if (num == 2) return "2nd";
    else if (num == 3) return "3rd";
    else return `${num}th`;
}

function updateUI() {
    const scoreDisplay = document.getElementById("scoreDisplay");

    scoreDisplay.innerText = "You have " + format(player.score) + " Score";

    const gens = player.generators;

    for (let i = 0; i < player.generators.length; i++) {
        const gen = player.generators[i];

        const btnId = `gen${i + 1}Btn`;
        const infoId = `gen${i + 1}Info`;

        document.getElementById(btnId).innerText = `Buy ${getNumericPositionString(i + 1)} Generator (Cost: ${format(totalGeneratorCost(i + 1))} Score)`;
        document.getElementById(infoId).innerText = `${getNumericPositionString(i + 1)} Generator: ${format(gens[i].totalAmount)} (${gens[i].timesBought})`;
    }
}

function gameLoop() {
    const gens = player.generators;

    player.score = player.score.plus(gens[0].totalAmount.div(20));
    gens[0].totalAmount = gens[0].totalAmount.plus(gens[1].totalAmount.div(200)); // 20 (ticks/s) * 10 (slow prod) = 200 (total)

    updateUI();
}

setInterval(() => {
    gameLoop();
}, 50);