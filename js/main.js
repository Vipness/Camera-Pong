let computerPaddle;
let playerPaddle;
let ball;

const playerScoreElem = document.querySelector("#player-score");
const computerScoreElem = document.querySelector("#computer-score");

let gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.canvas.setAttribute("id", "canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
    gameArea.start();
    reset();
}

startGame();

function reset() {
    computerPaddle = new paddle(10, (canvas.height / 2) - 25);
    playerPaddle = new paddle((canvas.width - 20), (canvas.height / 2) - 25);
    ball = new createBall(canvas.width / 2, canvas.height / 2);
}

function paddle(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 50;

    this.update = function () {
        let ctx = gameArea.context;
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.move = function (y) {
        let ctx = gameArea.context;
        this.y = y - (ball.r * 2); // the ball is supposed to hit the center of the paddle
    }
}

function createBall(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.vel = 4;
    this.velIncrease = 1;
    let direction = { x: 0 };

    while (Math.abs(direction.x) <= .3 || Math.abs(direction.x) >= .9) {
        const headingTowards = randomNumberBetween(0, 2 * Math.PI)
        direction = {
            x: Math.cos(headingTowards),
            y: Math.sin(headingTowards)
        }
    }

    this.update = function () {
        this.x += direction.x * this.vel * this.velIncrease;
        this.y += direction.y * this.vel * this.velIncrease;

        let ctx = gameArea.context;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            direction.y *= -1; // Reverse vertical velocity on collision
        }

        if (isCollision(ball, playerPaddle) || isCollision(ball, computerPaddle)) {
            direction.x *= -1;
        }
        this.velIncrease += 0.001;
    }
}

function updateGameArea() {
    gameArea.clear();

    ball.update();

    computerPaddle.move(ball.y);
    computerPaddle.update();
    playerPaddle.update();

    if (isLose()) handleLose();
}


gameArea.canvas.addEventListener("mousemove", (event) => {
    playerPaddle.move(event.offsetY);
})

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function isLose() {
    return (ball.x + ball.r) >= canvas.width || (ball.x - ball.r) <= 0;
}

function handleLose() {
    if ((ball.x - ball.r) <= 0) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    }
    else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }
    reset();
}

function isCollision(ball, paddle) {
    return (
        ball.x - ball.r <= paddle.x + paddle.width && // ball left is touching paddle right
        ball.x + ball.r >= paddle.x && // ball right is touching paddle left
        ball.y - ball.r <= paddle.y + paddle.height && // ball top is touching paddle bottom
        ball.y + ball.r >= paddle.y // ball bottom is touching paddle top
    );
}