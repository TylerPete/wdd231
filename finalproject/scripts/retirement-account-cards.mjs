let allAccounts = [];

export async function getAccountTypeData() {
    const url = "https://raw.githubusercontent.com/TylerPete/wdd231/main/finalproject/data/retirement-account-data.json";

    const response = await fetch(url);
    const data = await response.json();

    allAccounts = data;

    displayCards(allAccounts);
}

export function displayCards(accountTypeData) {

    const cardsDiv = document.querySelector("#account-type-cards-div");
    cardsDiv.replaceChildren();

    accountTypeData.forEach((account, index) => {

        const div = document.createElement("div");
        div.classList.add("account-card");

        const icon = document.createElement("img");
        icon.classList.add("account-type-icon");
        icon.width = "32";
        icon.height = "32";
        icon.alt = `${account.account_type} icon`;
        icon.loading = "lazy";
        icon.src = `images/${account.image_filename}`;

        const h4 = document.createElement("h4");
        h4.textContent = account.account_type;

        const p1 = document.createElement("p");
        p1.textContent = `Contribution: ${account.contribution_tax_treatment}`;
        const p2 = document.createElement("p");
        p2.textContent = `Withdrawal: ${account.withdrawal_tax_restrictions}`;
        const p3 = document.createElement("p");
        p3.textContent = `Annual Contribution Limit (2025): ${account.annual_contribution_limits_as_of_2025}`;

        const openModalButton = document.createElement("button");
        openModalButton.classList.add("open-modal-button");
        openModalButton.id = account.account_type;
        openModalButton.textContent = "More info";

        openModalButton.addEventListener("click", function (event) {
            const buttonId = event.target.id;

            populateAccountModal(buttonId);
        });

        div.appendChild(icon);
        div.appendChild(h4);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(openModalButton);

        cardsDiv.appendChild(div);
    });
}

export function filterAccountTypes(fullData) {
    const traditionalCheckbox = document.querySelector("#traditional");
    const rothCheckbox = document.querySelector("#roth");
    const otherCheckbox = document.querySelector("#other");

    const employerYesRadio = document.querySelector("#employer-yes");
    const employerNoRadio = document.querySelector("#employer-no");
    const employerEitherRadio = document.querySelector("#employer-either");

    let taxCategorizationArray = [];

    if (traditionalCheckbox.checked) { taxCategorizationArray.push("Traditional"); }
    if (rothCheckbox.checked) { taxCategorizationArray.push("Roth"); }
    if (otherCheckbox.checked) { taxCategorizationArray.push("Other"); }

    const filteredData = fullData.filter(account => taxCategorizationArray.some(str => account.tax_categorization.includes(str)));

    displayCards(filteredData);
}

export function getAllAccounts() {
    return allAccounts;
}

export function populateAccountModal(buttonId) {
    const mainElement = document.querySelector("main");
    const theModal = document.querySelector("#account-modal");
    theModal.replaceChildren();

    const theAccount = allAccounts.find(account => account.account_type == buttonId);

    let annualContributionLimitsArray = theAccount.annual_contribution_limits_as_of_2025.split("; ");
    let annualContributionLimitsHTMLString = `<li>${annualContributionLimitsArray.join("</li>\n<li>")}</li>`;

    let withdrawalTaxRestrictionsArray = theAccount.withdrawal_tax_restrictions.split("; ");
    let withdrawalTaxRestrictionsHTMLString = `<li>${withdrawalTaxRestrictionsArray.join("</li>\n<li>")}</li>`;

    let otherInformationArray = theAccount.other_information.split("; ");
    let otherInformationHTMLString = `<li>${otherInformationArray.join("</li>\n<li>")}</li>`;

    theModal.innerHTML = `
        <div class="centered-div">
            <h2 class="modal-heading">${theAccount.account_type}</h2>
            <img class="modal-icon" width="44" height="44" alt="${theAccount.account_type} icon" loading="lazy"
                    src="images/${theAccount.image_filename}">
        </div>
        <p>Contribution Tax Treatment: ${theAccount.contribution_tax_treatment}</p>
        <p>Tax-Deductible Contributions: ${theAccount.tax_deductible_contributions}</p>
        <p>Employment-Based: ${theAccount.employment_based}</p>
        <p>Employer Match: ${theAccount.employer_match}</p>
        <hr>
        <button id="collapse-triangle1" class="collapse-toggle-triangle collapsed"></button><span>Annual Contribution
                Limits (2025):</span>
        <ul id="collapsible1 collapsed">
            ${annualContributionLimitsHTMLString}
        </ul>
        <hr>
        <button id="collapse-triangle2" class="collapse-toggle-triangle collapsed"></button><span>Withdrawal
                Tax/Restrictions:</span>
        <ul id="collapsible2 collapsed">
            ${withdrawalTaxRestrictionsHTMLString}
        </ul>
        <hr>
        <span id="collapse-triangle3" class="collapse-toggle-triangle collapsed"></span><span>Other information:</span>
        <ul id="collapsible3 collapsed">
            ${otherInformationHTMLString}
        </ul>
        <div class="centered-div">
            <button id="close-modal-button" class="green-button">Close</button>
        </div>`;

    const collapseButtons = document.querySelectorAll(".collapse-toggle-triangle");

    collapseButtons.forEach(function (button) {
        console.log(button);

        button.addEventListener("click", () => {
            button.classList.toggle("collapsed");

            let buttonNum = button.id[button.id.length - 1];
            const associatedUl = document.querySelector(`#collapsible${buttonNum}`);
            associatedUl.classList.toggle("collapsed");
        });
    })

    const closeModalButton = document.querySelector("#close-modal-button");
    closeModalButton.addEventListener("click", () => {
        theModal.close();
    });

    theModal.showModal();
}