// Copyright year and last modification
let gridDisplay = true;
const gridRadio = document.querySelector("#grid-select");
const listRadio = document.querySelector("#list-select");
const membersDiv = document.querySelector(".members-div");

gridRadio.addEventListener("change", () => {
    if (gridRadio.checked) {
        gridDisplay = true;
    }
    getMembers();
});

listRadio.addEventListener("change", () => {
    if (listRadio.checked) {
        gridDisplay = false;
    }
    getMembers();
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
        membersDiv.classList.remove("list");
        membersDiv.classList.add("grid");
        membersDiv.replaceChildren();

        data.forEach(function (member) {
            const memberDiv = document.createElement("div");
            memberDiv.classList.add("member-div");
            memberDiv.classList.add("grid");

            const h2 = document.createElement("h2");
            const span = document.createElement("span");
            const img = document.createElement("img");
            const address = document.createElement("p");
            const phone = document.createElement("p");
            const url = document.createElement("p");
            const opened = document.createElement("p");

            h2.textContent = member.name;
            let memberPrefix = "";
            switch (member.membershipLevel) {
                case 2:
                    memberPrefix = "Silver ";
                    break;
                case 3:
                    memberPrefix = "Gold ";
                    break;
                default:
                    memberPrefix = "";
            }
            span.textContent = `${memberPrefix}Member`;
            img.src = member.imageFile;
            address.textContent = `ADDRESS: ${member.address}`;
            phone.textContent = `PHONE: ${member.phone}`;
            url.textContent = `URL: ${member.url}`;
            opened.textContent = `OPENED: ${member.opened}`;

            memberDiv.appendChild(h2);
            memberDiv.appendChild(span);
            memberDiv.appendChild(img);
            memberDiv.appendChild(address);
            memberDiv.appendChild(phone);
            memberDiv.appendChild(url);
            memberDiv.appendChild(opened);

            membersDiv.appendChild(memberDiv);
        });

    } else {
        membersDiv.classList.add("list");
        membersDiv.classList.remove("grid");
        membersDiv.replaceChildren();

        data.forEach(function (member) {
            const h2 = document.createElement("h2");
            const memberDiv = document.createElement("div");
            memberDiv.classList.add("member-div");
            memberDiv.classList.add("list");

            const address = document.createElement("p");
            const phone = document.createElement("p");
            const url = document.createElement("p");
            const opened = document.createElement("p");

            let memberPrefix = "";
            switch (member.membershipLevel) {
                case 2:
                    memberPrefix = "Silver ";
                    break;
                case 3:
                    memberPrefix = "Gold ";
                    break;
                default:
                    memberPrefix = "";
            }

            h2.textContent = `${member.name} - ${memberPrefix}Member`;
            address.textContent = `ADDRESS: ${member.address}`;
            phone.textContent = `PHONE: ${member.phone}`;
            url.textContent = `URL: ${member.url}`;
            opened.textContent = `OPENED: ${member.opened}`;

            memberDiv.appendChild(address);
            memberDiv.appendChild(phone);
            memberDiv.appendChild(url);
            memberDiv.appendChild(opened);

            membersDiv.appendChild(h2);
            membersDiv.appendChild(memberDiv);
        });
    }
}

getMembers();