import Ball from "./Ball.js";

const ball = new Ball(document.querySelector("#ball"));
let lastTime;

function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime; // how much time has passed from the previous frame to the next
        ball.update(delta);
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);