const navbutton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

//Toggle the show class on and off
navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navBar.classList.toggle("show");
});