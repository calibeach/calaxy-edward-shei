<template>
    <div class="form-container">
        <Card>
            <form @submit.prevent="handleSubmit">
                <BaseInput id="purchasePrice" labelText="Purchase Price *" type="text" placeHolder="E.g. $100,000.00" v-model="loanDetails.purchasePrice"/>
                <BaseInput id="interestRate" labelText="Interest Rate *" type="text" placeHolder="E.g. 20 %" v-model="loanDetails.interestRate"/>
                <BaseInput id="downPaymentFixed" labelText="Down Payment in $" type="text" placeHolder="E.g. $15,000.00" v-model="loanDetails.downPaymentFixedAmount"/>
                <BaseInput id="downPaymentPercentage" labelText="Down Payment in %" type="text" placeHolder="E.g. 15%" v-model="loanDetails.downPaymentPercentage"/>
                <BaseInput id="mortgageTerms" labelText="Mortgage Term *" type="Text" placeHolder="E.g. 90 months" v-model="loanDetails.loanTerm"/>
                <button type="submit" class="-fill-gradient">
                    Generate Rates
                </button>
            </form>
        </Card>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Card from "./shared/Card.vue";
    import BaseInput from "./shared/BaseInput.vue";
    import { convertObjectValuesToNumbers, 
            convertToMonths, 
            calculateTotalPurchasePrice, 
            calculateMonthlyPayment, 
            calculateTotalLoanValue, 
            convertNumberToInterestRate, 
            convertTextToUSD } from "../helpers/index";
    
    import { useLoansStore } from "../stores/loans"

    export default defineComponent({
        name: "LoanDetailsForm",
        methods: {
            handleSubmit() {
                const store = useLoansStore();

                const loanTermInMonths = convertToMonths(this.loanDetails.loanTerm).toString();

                const modifiedLoanDetails = {
                    ...this.loanDetails,
                    loanTerm: loanTermInMonths
                }
                const loanDetailsNumbers = convertObjectValuesToNumbers(modifiedLoanDetails);
                
                const totalLoanAmount = calculateTotalPurchasePrice(loanDetailsNumbers.purchasePrice, loanDetailsNumbers.downPaymentFixedAmount, loanDetailsNumbers.downPaymentPercentage)

                const calculatedMonthlyPayment = calculateMonthlyPayment(totalLoanAmount, modifiedLoanDetails.interestRate, modifiedLoanDetails.loanTerm)

                const calculatedTotalLoanValue = calculateTotalLoanValue(calculatedMonthlyPayment, modifiedLoanDetails.loanTerm)

                const convertedInterestRate = convertNumberToInterestRate(modifiedLoanDetails.interestRate)

                const loanCalculations = {
                    mortgageTerm : Math.round((loanDetailsNumbers.loanTerm + Number.EPSILON) / 12).toString() + " years",
                    monthlyPayment : convertTextToUSD(calculatedMonthlyPayment),
                    interestRate: convertedInterestRate,
                    totalAmount: convertTextToUSD(totalLoanAmount),
                    totalOverLoanTerm: convertTextToUSD(calculatedTotalLoanValue)
                }
                store.addLoan(loanCalculations)
                this.loanDetails = {
                    purchasePrice: "",
                    interestRate: "",
                    downPaymentFixedAmount: "",
                    downPaymentPercentage: "",
                    loanTerm: ""
                }
            }
        },
        components: {
            Card,
            BaseInput,
        },
        data () {
            return {
                loanDetails: {
                    purchasePrice: "",
                    interestRate: "",
                    downPaymentFixedAmount: "",
                    downPaymentPercentage: "",
                    loanTerm: ""
                }
            }
        }
    });
</script>

<style>

    .form-container {
        margin-right: 1em;
    }

    input {
        padding: 4px 12px;
        font-size: 0.9em;
        border: 1px solid #D0D7E0;
        border-radius: 5px;
        color: #818181;
      }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    button {
        margin-top: 0.8em;
        background-color: #2491EB;
        color: white;
        border: none;
        padding: 0.5em;
        border-radius: 8px;
        min-width: 12.8em;
        font-weight: 600;
    }
</style>../helpers/helpers.js../helpers../helpers/types/index