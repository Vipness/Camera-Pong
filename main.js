let computerPaddle;
let playerPaddle;
let ball;
let camera, camCtx, video;

const playerScoreElem = document.querySelector("#player-score");
const computerScoreElem = document.querySelector("#computer-score");
const camWrapper = document.querySelector(".camWrapper");
const color = [181, 12, 85];

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

// player controller
document.body.addEventListener("load", main());
function main() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (rawData) {
            createCanvas();

            video = document.createElement("video");
            video.srcObject = rawData;
            video.play();
            video.onloadeddata = animate;
        })
        .catch(function (error) {
            console.info(error);
            handlePermDenied();
        })
}

function createCanvas() {
    camera = document.createElement("canvas");
    camera.setAttribute("id", "camera");
    camWrapper.appendChild(camera);
}

function handlePermDenied() {
    gameArea.canvas.style.cssText = "background-color: rgba(168, 168, 168, 0.651);";
    gameArea.canvas.addEventListener("mousemove", (event) => {
        playerPaddle.move(event.offsetY);
    })
}
function animate() {
    const camCtx = camera.getContext("2d");

    camera.width = 640;
    camera.height = 480;

    camCtx.drawImage(video, 0, 0, camera.width, camera.height);

    const imgData = camCtx.getImageData(0, 0, camera.width, camera.height);
    const locations = getLocationsWithColor(imgData, { r: 255, g: 0, b: 0 });

    if (locations.length > 0) {
        const center = average(locations);

        playerPaddle.move(center.y);

        // draw circle at center of pen
        camCtx.beginPath();
        camCtx.arc(center.x, center.y, 8, 0, 2 * Math.PI, false);
        camCtx.fillStyle = 'green';
        camCtx.fill();
        camCtx.lineWidth = 4;
        camCtx.strokeStyle = '#003300';
        camCtx.stroke();
    }

    requestAnimationFrame(animate);
}

function getLocationsWithColor(imgData, color) {
    const locations = [];

    for (let i = 0; i < imgData.data.length; i += 4) {
        const pxColor = {
            r: imgData.data[i],
            g: imgData.data[i + 1],
            b: imgData.data[i + 2]
        };

        const pxIndex = i / 4;

        const pxLocation = {
            x: pxIndex % imgData.width,
            y: Math.floor(pxIndex / imgData.width)
        }

        if (colorsMatch(pxColor, color)) {
            locations.push(pxLocation);
        }
    }
    return locations;
}

function colorsMatch(pxColor, color, threshold = 160) {
    return sqDistance(pxColor, color) < threshold ** 2;
}

function sqDistance(pxColor, color) {
    return (pxColor.r - color.r) ** 2 +
        (pxColor.g - color.g) ** 2 +
        (pxColor.b - color.b) ** 2
}

function average(locations) {
    const result = {
        x: 0,
        y: 0
    }

    locations.forEach(loc => {
        result.x += loc.x;
        result.y += loc.y;
    })

    result.x /= locations.length;
    result.y /= locations.length;
    return result;
}