import { places } from "../data/places.mjs";

function displayItems(places) {
    places.forEach(place => {
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        h2.textContent = place.name;

        const photo = document.createElement("img");
        photo.src = `images/${place.photo_file}`;
        photo.alt = place.name;

        const p = document.createElement("p");
        p.textContent = place.description;
        const address = document.createElement("address");
        address.textContent = place.address;

        const learnButton = document.createElement("button");
        learnButton.textContent = "Learn More";

        div.appendChild(h2);
        div.appendChild(photo);
        div.appendChild(p);
        div.appendChild(address);
        div.appendChild(learnButton);

        const mainElement = document.querySelector("main");
        mainElement.appendChild(div);
    });
}

displayItems(places);