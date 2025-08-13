export async function getAccountTypeData() {
    const url = "https://raw.githubusercontent.com/TylerPete/wdd231/main/finalproject/data/retirement-account-data.json";

    const response = await fetch(url);
    const data = await response.json();

    filterAccountTypes(data);
}

export function displayCards(accountTypeData) {

    const cardsDiv = document.querySelector("#account-type-cards-div");
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
        openModalButton.textContent = "More info";

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

    fullData.filter(account => account.)

    displayCards(filteredData);
}
