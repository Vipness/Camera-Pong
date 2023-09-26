let computerPaddle;
let playerPaddle;
let ball;

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
    computerPaddle = new paddle(10, (canvas.height / 2) - 25);
    playerPaddle = new paddle((canvas.width - 20), (canvas.height / 2) - 25);
    ball = new createBall(canvas.width / 2, canvas.height / 2);
}

startGame();

function paddle(x, y) {
    this.x = x;
    this.y = y;

    this.update = function () {
        let ctx = gameArea.context;
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, 10, 50);
    }

    this.move = function (y) {
        let ctx = gameArea.context;
        this.y = y - ball.r;
    }
}

function createBall(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.vel = 4;
    let direction = {
        x: Math.cos(randomNumberBetween(0, 2 * Math.PI)),
        y: Math.sin(randomNumberBetween(0, 2 * Math.PI))
    }

    this.update = function () {
        let ctx = gameArea.context;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    this.move = function () {
        this.x += direction.x * this.vel;
        this.y += direction.y * this.vel;

        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            direction.x *= -1; // Reverse horizontal velocity on collision
        }

        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            direction.y *= -1; // Reverse vertical velocity on collision
        }
    }
}

function updateGameArea() {
    gameArea.clear();

    ball.move();
    ball.update();

    computerPaddle.move(ball.y);
    computerPaddle.update();
    playerPaddle.update();
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}