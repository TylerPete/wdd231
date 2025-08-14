import { setCopyrightYear } from "./copyright-year.mjs";
import { setUpNavigation } from "./navigation.mjs";

let originalScheduleArray = [];
let paymentScheduleArray = [];

//Input current year for copyright year
setCopyrightYear();

//Make hamburger button navigation function
setUpNavigation();

function getDataFromURL() {
    let params = new URLSearchParams(window.location.search);

    return params;
}

export function calculateMortgagePayoff(params, paymentScheduleArray) {

    let loanAmount = Number(params.get("loan-amount"));

    let currentBalance = Number(params.get("current-balance"));

    let extraMonthlyPayment = Number(params.get("extra-monthly-payment-amount"));

    let monthlyRate = Number(params.get("interest-rate")) / 100 / 12;

    let totalNumPayments = Number(params.get("original-term-length")) * 12;

    let standardPayment = (loanAmount * monthlyRate) / (1 - ((1 + monthlyRate) ** (-1 * totalNumPayments)));

    let asOfDate = new Date(params.get("timestamp"));
    let origDate = new Date(params.get("origination-date"));

    let monthsElapsed = ((asOfDate.getFullYear() - origDate.getFullYear()) * 12) + (asOfDate.getMonth() - origDate.getMonth());
    if (asOfDate.getDate() < origDate.getDate()) {
        monthsElapsed -= 1;
    }

    let lastPaymentDate = new Date(origDate);
    lastPaymentDate.setMonth(lastPaymentDate.getMonth() + monthsElapsed);

    let nextPaymentDate = new Date(origDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + monthsElapsed + 1);


    let daysUntilNextPayment = Math.floor((nextPaymentDate.getTime() - asOfDate.getTime()) / (1000 * 60 * 60 * 24));

    let accrued_interest = 0;
    if (extraMonthlyPayment > 0) {
        let dailyRate = (Number(params.get("interest-rate")) / 100) / 365;
        let accrued_interest = currentBalance * dailyRate * daysUntilNextPayment;
    }

    let balance_projected = currentBalance + accrued_interest;

    let paymentNumbers = [];        //nested Array index 0
    let paymentDates = [];          //nested Array index 1
    let beginningBalances = [];     //nested Array index 2
    let monthlyInterests = [];      //nested Array index 3
    let principalPayments = [];     //nested Array index 4
    let endingBalances = [];        //nested Array index 5
    let cumulativeInterest = [];    //nested Array index 6

    let i = 1;

    currentBalance = balance_projected;
    let currentDate = new Date(nextPaymentDate);
    while (currentBalance > 0.005) {
        paymentNumbers.push(i);

        paymentDates.push(currentDate.toDateString());

        let monthlyInterest = (currentBalance * monthlyRate);
        monthlyInterests.push(monthlyInterest);

        let totalPayment = standardPayment + extraMonthlyPayment;

        if (totalPayment > currentBalance + monthlyInterest) {
            totalPayment = currentBalance + monthlyInterest;
        }

        beginningBalances.push(currentBalance);

        let principalPayment = totalPayment - monthlyInterest;
        principalPayments.push(principalPayment);

        let endingBalance = (currentBalance - principalPayment);
        endingBalances.push(endingBalance);

        currentBalance = endingBalance;
        cumulativeInterest.push(monthlyInterest + (cumulativeInterest.at(-1) || 0));

        currentDate.setMonth(currentDate.getMonth() + 1);
        i++;
    }

    if (paymentScheduleArray) {
        paymentScheduleArray.push(paymentNumbers);
        paymentScheduleArray.push(paymentDates);
        paymentScheduleArray.push(beginningBalances);
        paymentScheduleArray.push(monthlyInterests);
        paymentScheduleArray.push(principalPayments);
        paymentScheduleArray.push(endingBalances);
        paymentScheduleArray.push(cumulativeInterest);
    }

    return cumulativeInterest.at(-1);
}

// Do stuff by calling functions
let interestSaved = calculateInterestSavings();
console.log(`Interest savings: ${interestSaved}`);
displayResultsAndStoreInLocalStorage();

export function calculateInterestSavings() {
    let params = getDataFromURL();

    let alteredParams = getDataFromURL();
    alteredParams.set("extra-monthly-payment-amount", "0");

    let interestWouldHavePaid = calculateMortgagePayoff(alteredParams, originalScheduleArray);

    let interestActuallyPaid = calculateMortgagePayoff(params, paymentScheduleArray);

    console.log(paymentScheduleArray);
    console.log(originalScheduleArray);

    return interestWouldHavePaid - interestActuallyPaid;
}

export function displayResultsAndStoreInLocalStorage() {
    const resultsDiv = document.querySelector("#results-div");

    let params = getDataFromURL();
    resultsDiv.innerHTML = `
                            <p>Debt-Free Date: ${paymentScheduleArray[1][paymentScheduleArray[1].length - 1]}</p>
                            <p>Total Interest Paid (from now to loan payoff): $${Number(paymentScheduleArray[6][paymentScheduleArray[6].length - 1].toFixed(2)).toLocaleString('en-US')}</p>
                            <p>Savings on Interest: $${Number(interestSaved.toFixed(2)).toLocaleString('en-US')}</p>
                            
                            <hr>
                            
                            <p>Mortgage Details entered:</p>
                            <ul>
                                <li>Original Loan Amount: $${Number(Number(params.get("loan-amount")).toFixed(2)).toLocaleString('en-US')}</li>
                                <li>Current balance: $${Number(Number(params.get("current-balance")).toFixed(2)).toLocaleString('en-US')}</li>
                                <li>Interest rate: ${params.get("interest-rate")}%</li>
                                <li>Origination date: ${params.get("origination-date")}</li>
                                <li>Original term length: ${params.get("original-term-length")} years</li>
                                <li>Extra monthly payment: $${params.get("extra-monthly-payment-amount")}</li>
                            </ul>`;

    window.localStorage.setItem("lastParams", JSON.stringify(Object.fromEntries(params.entries())));
}

