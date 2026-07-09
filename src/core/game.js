let score = new Decimal(0);

function updateUI() {
    const scoreDisplay = document.getElementById("scoreDisplay");

    scoreDisplay.innerText = "You have " + format(score) + " Score";
}

function increment() {
    score = score.plus(1);

    updateUI();
}

setInterval(() => {
    updateUI();
}, 50);