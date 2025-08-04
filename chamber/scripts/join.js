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

const submitButton = document.querySelector("#submit-button");
const hiddenTimestampInput = document.querySelector("#timestamp");

submitButton.addEventListener("click", () => {
    const dateTimeNow = new Date();

    let options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    const dateTimeNowString = new Intl.DateTimeFormat("en-us", options).format(dateTimeNow);

    hiddenTimestampInput.value = dateTimeNowString;
});


//Open the appropriate modals for details about membership levels when "Learn more" buttons are clicked

const goldModal = document.querySelector("#gold-modal");

document.querySelector("#np-level-button").addEventListener("click", () => {
    document.querySelector("#np-modal").showModal();
});

document.querySelector("#bronze-level-button").addEventListener("click", () => {
    document.querySelector("#bronze-modal").showModal();
});

document.querySelector("#silver-level-button").addEventListener("click", () => {
    document.querySelector("#silver-modal").showModal();
});

document.querySelector("#gold-level-button").addEventListener("click", () => {
    document.querySelector("#gold-modal").showModal();
});