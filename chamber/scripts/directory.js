// Copyright year and last modification
let gridDisplay = true;
const gridRadio = document.querySelector("#grid-select");
const listRadio = document.querySelector("#list-select");

gridRadio.addEventListener("change", () => {
    if (gridRadio.checked) {
        gridDisplay = true;
    }
});

listRadio.addEventListener("change", () => {
    if (listRadio.checked) {
        gridDisplay = false;
    }
});

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

const today = new Date();
currentYear.textContent = today.getFullYear();

const lastModifiedDate = new Date(document.lastModified);
lastModified.textContent = `${new Intl.DateTimeFormat("en-US",
    {
        dateStyle: "short", timeStyle: "medium"
    }).format(lastModifiedDate)}`;

// Navigation/hamburger button functionality
const navBar = document.querySelector("#nav-bar");
const hamburger = document.querySelector("#ham-btn");

hamburger.addEventListener("click", () => {
    navBar.classList.toggle("show");
});

// Fetching of the CoC members data
const path = "./data/members.json";

async function getMembers() {
    try {
        const response = await fetch(path);
        const data = await response.json();
        console.log(data); //TEMPORARY
        displayMembers(data);

    } catch (error) {
        console.error("Error fetching members data:", error);
    }
}

function displayMembers(data) {
    if (gridDisplay) {
        //code for generating grid member cards
    } else {
        ///code for generating member list
    }
}

getMembers();