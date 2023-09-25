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
}

function createBall(x, y) {
    this.x = x;
    this.y = y;

    this.update = function () {
        let ctx = gameArea.context;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function updateGameArea() {
    gameArea.clear();

    ball.update();
    computerPaddle.update();
    playerPaddle.update();
}