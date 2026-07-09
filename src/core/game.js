let player = {
    score: new Decimal(0),
    generators: [
        {
            initialCost: new Decimal(10),
            costMultiplier: new Decimal(1.25), // maybe i'll scrap this and switch into 10-buy mode, but we'll see that
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

    return gen.initialCost.mul(Decimal.pow(gen.costMultiplier, gen.totalAmount));
}

function buyGenerator(id) {
    if (id < 1 || id > 2) throw new RangeError("Generator id must be an number from 1-1!");

    const totalCost = totalGeneratorCost(id);
    const gen = player.generators[id - 1];

    if (player.score.gte(totalCost) && gen.timesBought <= Number.MAX_SAFE_INTEGER) {
        player.score = player.score.sub(totalCost);

        gen.totalAmount = gen.totalAmount.plus(1);
        gen.timesBought++;

        updateUI();
    }
}

function updateUI() {
    const scoreDisplay = document.getElementById("scoreDisplay");

    scoreDisplay.innerText = "You have " + format(player.score) + " Score";
}

function gameLoop() {
    const gens = player.generators;

    const gen1Btn = document.getElementById("gen1Btn");
    const gen1Info = document.getElementById("gen1Info");

    gen1Btn.innerText = `Buy 1st Generator (Cost: ${format(totalGeneratorCost(1))} Score)`;
    gen1Info.innerText = `1st Generator: ${format(gens[0].totalAmount)} (${gens[0].timesBought})`;

    player.score = player.score.plus(gens[0].totalAmount.div(20));

    updateUI();
}

setInterval(() => {
    gameLoop();
}, 50);