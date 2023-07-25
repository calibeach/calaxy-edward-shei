import { describe, it, expect, beforeEach } from 'vitest'
import { convertObjectValuesToNumbers,
         convertToMonths, 
         calculateTotalPurchasePrice, 
         calculateMonthlyPayment, 
         calculateTotalLoanValue, 
         convertNumberToInterestRate, 
         convertTextToUSD }  from "../../helpers/index"

describe('Helpers', () => {
    // Tests that an object with all values as numbers is correctly converted
    it('convertObjectValuesToNumbers_converts_all_values_numbers', () => {
        const object = {a: "1", b: "2", c: "3"}
        const expected = {a: 1, b: 2, c: 3}
        const result = convertObjectValuesToNumbers(object)
        expect(result).toEqual(expected)
    })
        // Tests that the function returns the correct number of months when input string contains a number followed by 'years'
    it('convertToMonths_convert_years_to_months', () => {
        expect(convertToMonths('2 years')).toBe(24);
    });
    //Tests that the function returns the correct total purchase price when given valid purchase price and down payment
    it('test_valid_purchase_price_and_down_payment', () => {
        expect(calculateTotalPurchasePrice(1000, 200, 0)).toBe('800');
    });
    // Tests that the function returns the correct total purchase price when given valid purchase price and down payment percentage
    it('test_valid_purchase_price_and_down_payment_percentage', () => {
        expect(calculateTotalPurchasePrice(1000, 0, 20)).toBe('800');
    });

    // Tests that calculateMonthlyPayment returns the expected monthly payment for valid principal, interest rate, and loan term values
    it('test_happy_path_principal_interest_loan_term', () => {
            expect(calculateMonthlyPayment("10000", "5", "60")).toBe('188.71');
    });
})