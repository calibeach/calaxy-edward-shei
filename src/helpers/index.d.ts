
  export function convertObjectValuesToNumbers(object: Record<string, unknown>): Record<string, number>;
  export function convertToMonths(string: string): number;
  export function calculateTotalPurchasePrice(purchasePrice: number, downPayment: number, downPaymentPercentage: number): string;
  export function calculateMonthlyPayment(principal: string, interestRate: string, loanTermInMonths: string): string;
  export function calculateTotalLoanValue(monthlyPayment: string, loanTermInMonths: string): string;
  export function convertNumberToInterestRate(interestRate: string): string;
  export function convertTextToUSD(text: string): string;

