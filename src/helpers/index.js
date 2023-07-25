
export function convertObjectValuesToNumbers (object) {
            const newObject = {}
            for (const [key, value] of Object.entries(object)) {
                newObject[key] = Number(value)
            }
            return newObject
        }

export function convertToMonths(string) {
    const lowerCaseString = string.toLowerCase();
    return lowerCaseString.includes("years") ? (12 * (Number(lowerCaseString.substring(0, lowerCaseString.indexOf(' '))))) : (Number(lowerCaseString.substring(0, lowerCaseString.indexOf(' '))));
}

export function calculateTotalPurchasePrice(purchasePrice, downPayment, downPaymentPercentage) {
    if (downPaymentPercentage) {
        return (purchasePrice - (purchasePrice * (downPaymentPercentage / 100))).toString()
    } else {
        return (purchasePrice - downPayment).toString()
    }
}

export function calculateMonthlyPayment(principal, interestRate, loanTermInMonths) {
    let interest = interestRate / 100 / 12;
    let x = Math.pow(1 + interest, loanTermInMonths);
    const monthlyPayments = (principal*x*interest)/(x-1);

    return monthlyPayments.toFixed(2);
}

export function calculateTotalLoanValue (monthlyPayment, loanTermInMonths) {
    return (monthlyPayment * loanTermInMonths).toFixed(2);
}

export function convertNumberToInterestRate(interestRate) {
    return interestRate.toString() + "%";
}

export function convertTextToUSD(text) {
    const convertedText = Number(text)
    let formatting_options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
     }
     let dollarString = new Intl.NumberFormat( "en-US", formatting_options );
     return dollarString.format(convertedText);
}
