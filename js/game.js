const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let computerPaddle, playerPaddle;
let ball, camera;
let isAnimating = true;
let color = { r: 84, g: 152, b: 83 };

if (sessionStorage.getItem("color")) color = JSON.parse(sessionStorage.getItem("color"));

const wrapper = document.querySelector(".wrapper");
const playerScoreElem = document.querySelector("#player-score");
const computerScoreElem = document.querySelector("#computer-score");
const numOfRounds = sessionStorage.getItem("numOfRounds");

canvas.width = 640;
canvas.height = 480;
clearCanvas();
reset();

function animateGame() {
    clearCanvas();

    ball.update();
    computerPaddle.compMove(ball.y);
    computerPaddle.update();
    playerPaddle.update();

    if (isLose()) handleLose();

    const playerScore = parseInt(playerScoreElem.textContent);
    const computerScore = parseInt(computerScoreElem.textContent);
    if (playerScore >= numOfRounds || computerScore >= numOfRounds) stopGame(playerScore, computerScore);
    if (isAnimating) window.requestAnimationFrame(animateGame);
}
setTimeout(() => {
    animateGame();
}, 2000);

function stopGame(playerScore, computerScore) {
    window.cancelAnimationFrame(animateGame);
    window.cancelAnimationFrame(animateCamera);
    isAnimating = false;
    canvas.remove();
    if (camera != null) camera.remove();

    document.querySelector(".resultsBox").style.display = "flex";
    document.querySelector("#winner").textContent = playerScore >= computerScore ? "You win!" : "You lose!";

    let countDownTimer = 5;
    document.querySelector("#timer").textContent = countDownTimer;

    const countDownInterval = setInterval(() => {
        countDownTimer--;
        document.querySelector("#timer").textContent = countDownTimer;

        if (countDownTimer <= 0) {
            clearInterval(countDownInterval);
            window.location.assign("./index.php");
        }
    }, 1000);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reset() {
    computerPaddle = new Paddle(10, (canvas.height / 2) - 25);
    playerPaddle = new Paddle(canvas.width - 20, (canvas.height / 2) - 25);
    ball = new Ball(canvas.width / 2, canvas.height / 2);

    if (sessionStorage.getItem("difficulty")) ball.vel = sessionStorage.getItem("difficulty");
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function isLose() {
    return (ball.x + ball.r) >= canvas.width || (ball.x - ball.r) <= 0;
}

function handleLose() {
    if ((ball.x - ball.r) <= 0) playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    else computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
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
            createCamera();

            video = document.createElement("video");
            video.srcObject = rawData;
            video.play();
            video.onloadeddata = animateCamera;
        })
        .catch(function (error) {
            console.info(error);
            handlePermDenied();
        })
}

function createCamera() {
    camera = document.createElement("canvas");
    camera.setAttribute("id", "camera");
    wrapper.insertBefore(camera, canvas);
}

function handlePermDenied() {
    canvas.style.cssText = "background-color: var(--secondary)";
    canvas.addEventListener("mousemove", (event) => {
        playerPaddle.playerMove(event.offsetY);
    })
}

function animateCamera() {
    const cameraCtx = camera.getContext("2d");

    camera.width = canvas.width;
    camera.height = canvas.height;

    cameraCtx.drawImage(video, 0, 0, camera.width, camera.height);
    const imgData = cameraCtx.getImageData(0, 0, camera.width, camera.height);
    imgData.willReadFrequently = true;
    // console.log(imgData.data[0], imgData.data[1], imgData.data[2]);

    const locations = getLocationsWithColor(imgData, color);
    if (locations.length > 0) {
        const center = average(locations);
        playerPaddle.playerMove(center.y);
        drawCircle(cameraCtx, center); // draw circle at center of pen
    }

    if (isAnimating) window.requestAnimationFrame(animateCamera);
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

        if (colorsMatch(pxColor, color)) locations.push(pxLocation);
    }
    return locations;
}

function colorsMatch(pxColor, color, threshold = 25) {
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

function drawCircle(cameraCtx, center) {
    cameraCtx.beginPath();
    cameraCtx.arc(center.x, center.y, 8, 0, 2 * Math.PI, false);
    cameraCtx.fillStyle = 'green';
    cameraCtx.fill();
    cameraCtx.lineWidth = 4;
    cameraCtx.strokeStyle = '#003300';
    cameraCtx.stroke();
}