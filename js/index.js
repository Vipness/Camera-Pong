const rounds = document.querySelector("#rounds");
const roundsText = document.querySelector("#roundsText")

roundsText.textContent = ` ${rounds.value}`;

rounds.addEventListener("change", () => {
    roundsText.textContent = ` ${rounds.value}`;
})