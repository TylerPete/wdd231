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

// Get URLSearchParams to display confirmation of form submission details

const resultsDiv = document.querySelector("#form-submission-results");

const theParams = new URLSearchParams(window.location.search);

resultsDiv.innerHTML = `<h2>Your application details:</h2>
                            <ul>
                                <li>First name: ${theParams.get("firstname")}</li>
                                <li>Last name: ${theParams.get("lastname")}</li>
                                <li>Email address: ${theParams.get("email")}</li>
                                <li>Mobile phone: ${theParams.get("phone")}</li>
                                <li>Organization/Business name: ${theParams.get("org-name")}</li>
                                <li>Submitted on ${theParams.get("timestamp")}</li>
                            </ul > `;
