let canvas, ctx, video;
const camWrapper = document.querySelector(".wrapper");
const color = [181, 12, 85];
const playerPaddle = document.querySelector("#player-paddle");

function main() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (rawData) {
            createCanvas();

            video = document.createElement("video");
            video.srcObject = rawData;
            video.play();
            video.onloadeddata = animate;
        })
        .catch(function (error) { handlePermDenied(); })
}

function createCanvas() {
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "camera");
    camWrapper.appendChild(canvas);
}

function handlePermDenied() { // if camera permissions are denied, control the player paddle with the mouse
    window.addEventListener("mousemove", (e) => {
        playerPaddle.style.cssText = `top: ${(e.y / window.innerHeight) * 100}vh`
    })
}

function animate() {
    const ctx = canvas.getContext("2d");
    const aspectRatio = video.videoWidth / video.videoHeight;

    canvas.width = aspectRatio * window.innerHeight;
    canvas.height = window.innerHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const locations = getLocationsWithColor(imgData, { r: 255, g: 0, b: 0 });

    if (locations.length > 0) {
        const center = average(locations);

        playerPaddle.style.cssText = `top: ${center.y}px;`;

        // draw circle at center of pen
        ctx.beginPath();
        ctx.arc(center.x, center.y, 8, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
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