const rounds = document.querySelector("#rounds");
const roundsText = document.querySelector("#roundsText");
const speed = document.querySelector("#speed");
const speedText = document.querySelector("#speedText");

window.addEventListener("load", updateText);
rounds.addEventListener("input", updateText);
speed.addEventListener("input", updateText);

function updateText() {
    sessionStorage.setItem("numOfRounds", rounds.value);
    sessionStorage.setItem("ballSpeed", speed.value);
    roundsText.textContent = ` ${sessionStorage.getItem("numOfRounds")}`;
    speedText.textContent = ` ${sessionStorage.getItem("ballSpeed")}`;
}