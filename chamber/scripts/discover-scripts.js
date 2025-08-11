import { places } from "../data/places.mjs";

function displayItems(places) {
    places.forEach(place => {
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        h2.textContent = place.name;

        const photo = document.createElement("img");
        photo.src = `images/${place.photo_file}`;
        photo.width = "300";
        photo.height = "200";
        photo.alt = place.name;
        photo.loading = "lazy";

        const p = document.createElement("p");
        p.textContent = place.description;
        const address = document.createElement("address");
        address.textContent = place.address;

        const flexDiv = document.createElement("div");
        flexDiv.classList.add("flex-div");

        const learnButton = document.createElement("button");
        learnButton.textContent = "Learn More";
        flexDiv.appendChild(learnButton);

        div.appendChild(h2);
        div.appendChild(photo);
        div.appendChild(p);
        div.appendChild(address);
        div.appendChild(flexDiv);

        const mainDiv = document.querySelector("#put-here");
        mainDiv.appendChild(div);
    });
}

//Visit message handling with localStorage
function getLastVisitDate() {
    if ("lastVisitDate" in localStorage) {
        let lastVisitDate = new Date(JSON.parse(window.localStorage.getItem("lastVisitDate")));

        displayVisitMessage(lastVisitDate);
    } else {
        displayVisitMessage("");
    }

}

function displayVisitMessage(lastVisitDate) {
    let message;

    if (lastVisitDate == "") {
        message = "Welcome! Let us know if you have any questions.";
    } else {

        let today = Date.now();
        let lastTime = lastVisitDate.getTime();
        let difference = today - lastTime;

        if (difference < 86400000) {
            message = "Back so soon! Awesome!";
        } else {
            let s = "";

            if (difference >= 172800000) { s = "s"; }

            message = `You last visited ${(difference / 86400000).toFixed(0)} day${s} ago.`;
        }

    }
    messageP.textContent = message;

    setLastVisitDate();
}

function setLastVisitDate() {
    const lastVisitDate = new Date();

    window.localStorage.setItem("lastVisitDate", JSON.stringify(lastVisitDate));
}

const messageP = document.querySelector("#welcome-message");

getLastVisitDate();

displayItems(places);