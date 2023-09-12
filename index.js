let canvas, ctx, video;
function main() {
    canvas = document.querySelector("#camera");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (rawData) {
            video = document.createElement("video");
            video.srcObject = rawData;
            video.play();
            video.onloadeddata = animate;
        })
        .catch(function (error) { alert(error) })
}

function animate() {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animate);
}