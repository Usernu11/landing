// Обработчик для бургер-меню
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const menu = document.querySelector("nav ul");

    if (burger && menu) {
        burger.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    } else {
        console.error("Burger or menu element is missing!");
    }
});
