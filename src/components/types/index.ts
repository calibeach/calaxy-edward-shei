export type ItemsType = {
  itemDescription: string;
  amount: number;
};

export type InvoicesType = {
  invoiceDetails: {
    invoiceNumber: string;
    recipient: string;
    totalAmount: number;
    invoiceCreated: Date;
    invoiceDue: Date;
    items: {
      description: string;
      amount: number;
    }[];
  };
};

export interface InvoiceDetails {
  invoiceNumber: string;
  recipient: string;
  totalAmount: number;
  invoiceCreated: Date;
  invoiceDue: Date;
  items: {
    description: string;
    amount: number;
  }[];
  itemDescription: string;
  itemAmount: number;
  notes: string;
}


