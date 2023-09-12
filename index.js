const myVideo = document.querySelector("#myVideo");

function main() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (rawData) {
            myVideo.srcObject = rawData;
            myVideo.play();
        })
        .catch(function (error) { alert(error) })
}