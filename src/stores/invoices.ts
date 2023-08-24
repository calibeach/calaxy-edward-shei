import { defineStore } from "pinia";

import type { InvoiceDetails } from "../components/types/index";

export const useInvoicesStore = defineStore("invoices", {
  state: () => ({
    invoices: <InvoiceDetails[]>[],
  }),
  actions: {
    addInvoice(invoice: InvoiceDetails) {
      this.invoices = [invoice, ...this.invoices];
    },
    retrieveInvoices() {
      return this.invoices;
    },
    setInvoices(invoices: InvoiceDetails[]) {
      this.invoices = invoices;
    },
  },
});
