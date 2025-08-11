//Make hamburger button navigation function
export function setUpNavigation() {
    const navBar = document.querySelector("#nav-bar");
    const hamButton = document.querySelector("#ham-btn");

    hamButton.addEventListener("click", () => {
        navBar.classList.toggle("show");
        hamButton.classList.toggle("show");
    });
}