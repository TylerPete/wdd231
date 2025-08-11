import { setCopyrightYear } from "./copyright-year.mjs";

//Make hamburger button navigation function
const navBar = document.querySelector("#nav-bar");
const hamButton = document.querySelector("#ham-btn");

hamButton.addEventListener("click", () => {
    navBar.classList.toggle("show");
    hamButton.classList.toggle("show");
});

//Input current year for copyright year
setCopyrightYear();