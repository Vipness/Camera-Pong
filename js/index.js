const rounds = document.querySelector("#rounds");
const roundsText = document.querySelector("#roundsText");
const radioButtons = document.querySelectorAll('input[name="difficulty"]');

window.addEventListener("load", updateText);
rounds.addEventListener("input", updateText);

function updateText() {
    sessionStorage.setItem("numOfRounds", rounds.value);
    roundsText.textContent = ` ${sessionStorage.getItem("numOfRounds")}`;
}

radioButtons.forEach(radioButton => {
    radioButton.addEventListener("change", () => {
        sessionStorage.setItem("difficulty", radioButton.value);
    })
})

window.addEventListener("load", () => {
    let user = document.querySelector(".profile") ? true : false;
    sessionStorage.setItem("user", user);

    radioButtons.forEach(radioButton => {
        if (radioButton.checked) sessionStorage.setItem("difficulty", radioButton.value);
    })
})