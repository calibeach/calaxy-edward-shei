import type { InvoiceDetails } from "../components/types/index";

export async function postInvoice(data: InvoiceDetails): Promise<void> {
  const uri = "http://localhost:3000/invoices/";
  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log("Success:", JSON.stringify(responseData));
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchInvoices(): Promise<InvoiceDetails[]> {
  const uri = "http://localhost:3000/invoices/";
  try {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
