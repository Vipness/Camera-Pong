import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.querySelector("#ball"));
const playerPaddle = new Paddle(document.querySelector("#player-paddle"));
const computerPaddle = new Paddle(document.querySelector("#computer-paddle"));
const playerScoreElem = document.querySelector("#player-score");
const computerScoreElem = document.querySelector("#computer-score");

let lastTime;
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime; // how much time has passed from the previous frame to the next
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);

        if (isLose()) handleLose();
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0; // if ball is out of bounds
}

function handleLose() {
    const rect = ball.rect();
    if (rect.left <= 0) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    }
    else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }

    ball.reset();
    computerPaddle.reset();
}

window.requestAnimationFrame(update);