const accountBtn = document.querySelectorAll(".account span");

accountBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        switch (btn.textContent) {
            case "Login": document.querySelector(".register").classList.remove("active"); break;
            case "Register": document.querySelector(".login").classList.remove("active"); break;
        }
        document.querySelector(`.${btn.textContent.toLowerCase()}`).classList.add("active");
    })
});