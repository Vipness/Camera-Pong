import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.querySelector("#ball"));
const computerPaddle = new Paddle(document.querySelector("#computer-paddle"));

let lastTime;
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime; // how much time has passed from the previous frame to the next
        ball.update(delta);
        computerPaddle.update(delta, ball.y)
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);