// Copyright year and last modification
let gridDisplay = true;
const gridRadio = document.querySelector("#grid-select");
const listRadio = document.querySelector("#list-select");
const membersDiv = document.querySelector("#members-div");

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
        // <div class="member-div grid">
        //     <h2>Walmart</h2>
        //     <span>Silver Member</span>
        //     <img src="images/walmart-2-1.jpeg">
        //     <p>ADDRESS: 1515 SE Marshall St </p>
        //     <p>PHONE: 515-432-2416</p>
        //     <p>URL: https://www.walmart.com/</p>
        //     <p>OPENED: 2013</p>
        // </div>


    } else {
        ///code for generating member list
    }
}

getMembers();