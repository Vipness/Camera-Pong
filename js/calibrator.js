const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const wrapper = document.querySelector(".wrapper");

let isAnimating = true;
let camera;
let color = {}

canvas.width = 640;
canvas.height = 480;
ctx.clearRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = "yellow";
ctx.fillRect(canvas.width - 20, 0, 20, 20)

// player controller
document.body.addEventListener("load", main());
function main() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (rawData) {
            camera = document.createElement("canvas");
            camera.setAttribute("id", "camera");
            wrapper.insertBefore(camera, canvas);

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

function animateCamera() {
    const cameraCtx = camera.getContext("2d");

    camera.width = canvas.width;
    camera.height = canvas.height;

    cameraCtx.drawImage(video, 0, 0, camera.width, camera.height);
    const imgData = cameraCtx.getImageData(0, 0, camera.width, camera.height);
    imgData.willReadFrequently = true;

    if (Object.keys(color).length === 0) {
        color.r = imgData.data[0]; color.g = imgData.data[1]; color.b = imgData.data[2];
    }

    let newColor = { r: imgData.data[0], g: imgData.data[1], b: imgData.data[2] };
    if (!colorsMatch(newColor, color)) {
        // countdown from 3 -> "screenshot" -> capture color and save
        let countDownTimer = 3;
        document.querySelector("#timer").textContent = countDownTimer;
        document.querySelector(".timerTxt").style.display = "block";

        const countDownInterval = setInterval(() => {
            countDownTimer--;
            document.querySelector("#timer").textContent = countDownTimer;

            if (countDownTimer <= 0) {
                clearInterval(countDownInterval);
                // alert("Screenshot");
                window.cancelAnimationFrame(this);
                isAnimating = false;

                setTimeout(() => {
                    window.location.assign("../index.php");
                }, 1000);
            }
        }, 1000);
    }
    color = newColor;

    if (isAnimating) window.requestAnimationFrame(animateCamera);
}

function colorsMatch(pxColor, color, threshold = 60) {
    return sqDistance(pxColor, color) < threshold ** 2;
}

function sqDistance(pxColor, color) {
    return (pxColor.r - color.r) ** 2 +
        (pxColor.g - color.g) ** 2 +
        (pxColor.b - color.b) ** 2
}