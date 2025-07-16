const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
    const response = await fetch(url);  //request
    const data = await response.json(); //parse the JSON data
    //console.table(data.prophets);

    displayProphets(data.prophets);     //reference the array within the data
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        //card build code here
    });
}

getProphetData();