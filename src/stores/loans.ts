import { defineStore } from 'pinia'

import type { LoanCalculationsType } from './../components/types/index';


export const useLoansStore = defineStore('loans', {
    state: () => ({
        loans: <LoanCalculationsType[]>([]),
    }),
    actions: { 
        addLoan(loan: LoanCalculationsType) {
            this.loans = [loan, ...this.loans]
        },
        retrieveLoans() {
            return this.loans
        }
     },
})
