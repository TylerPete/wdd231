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

    let standardPayment = (loanAmount * monthlyRate) / (1 - ((1 + monthlyRate) ** (-1 * totalNumPayments)));

    let paymentNumbers = [];
    let beginningBalances = [];
    let monthlyInterest = [];
    let principalPayments = [];
    let endingBalances = [];
    let cumulativeInterest = [];

    let previousCumulativeInterest = 0;
    let i = 1;

    let testDownIterator = 5;
    while (testDownIterator > 0) {
        paymentNumbers.push(i);

        beginningBalances.push(currentBalance);

        let monthlyInterest = currentBalance * monthlyRate;
        monthlyInterest.push(monthlyInterest);

        let principalPayment = standardPayment + extraMonthlyPayment - monthlyInterest;
        principalPayments.push(principalPayment);

        let endingBalance = currentBalance - principalPayment;
        endingBalances.push(endingBalance);

        currentBalance = endingBalance;
        cumulativeInterest.push(monthlyInterest + previousCumulativeInterest);
        previousCumulativeInterest = cumulativeInterest[i - 1];
        i++;

        console.log(previousCumulativeInterest);
        testDownIterator--;
    }
}

getDataFromURL();