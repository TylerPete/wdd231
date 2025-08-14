import { setCopyrightYear } from "./copyright-year.mjs";
import { setUpNavigation } from "./navigation.mjs";

const resultsDiv = document.querySelector("#results-div");
let params;

//Input current year for copyright year
setCopyrightYear();

//Make hamburger button navigation function
setUpNavigation();

function getDataFromURL() {
    params = new URLSearchParams(window.location.search);

    calculateMortgagePayoff();
}

// loan-amount & current-balance & interest-rate &
// origination-date & original-term-length &
// extra-monthly-payment-amount & timestamp

export function calculateMortgagePayoff() {
    let loanAmount = params.get("loan-amount");

    let currentBalance = params.get("current-balance");

    let extraMonthlyPayment = params.get("extra-monthly-payment-amount");

    let monthlyRate = (params.get("interest-rate") / 100) / 12;

    let totalNumPayments = params.get("original-term-length") * 12;

    let standardPayment = ((loanAmount * monthlyRate) / (1 - ((1 + monthlyRate) ** (-1 * totalNumPayments)))).toFixed(2);

    let paymentNumbers = [];
    let beginningBalances = [];
    let monthlyInterests = [];
    let principalPayments = [];
    let endingBalances = [];
    let cumulativeInterest = [];

    let previousCumulativeInterest = 0;
    let i = 1;

    while (currentBalance > 0.01) {
        paymentNumbers.push(i);

        let monthlyInterest = (currentBalance * monthlyRate).toFixed(2);
        monthlyInterests.push(monthlyInterest);
        console.log(`Monthly interest payment: ${monthlyInterest}`);

        let totalPayment = standardPayment + extraMonthlyPayment;

        if (totalPayment > currentBalance + monthlyInterest) {
            totalPayment = currentBalance + monthlyInterest;
        }

        beginningBalances.push(currentBalance);

        let principalPayment = totalPayment - monthlyInterest;
        principalPayments.push(principalPayment);

        let endingBalance = currentBalance - principalPayment;
        endingBalances.push(endingBalance);

        currentBalance = endingBalance;
        cumulativeInterest.push(monthlyInterest + previousCumulativeInterest);
        previousCumulativeInterest = cumulativeInterest[i - 1];

        console.log(`Ending balance after payment #${i}: ${endingBalance}`);
        i++;
    }
}

getDataFromURL();