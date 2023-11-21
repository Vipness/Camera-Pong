const rounds = document.querySelector("#rounds");
const roundsText = document.querySelector("#roundsText")

window.addEventListener("load", setRoundsText)
rounds.addEventListener("input", setRoundsText)

function setRoundsText() {
    sessionStorage.setItem("numOfRounds", rounds.value);
    roundsText.textContent = ` ${sessionStorage.getItem("numOfRounds")}`;
}