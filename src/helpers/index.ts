import { format } from "date-fns";

// This function generates an invoice number using the current date and a random number
export function generateInvoiceNumber(): string {
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  const random = randomBytes[0].toString().padStart(10, "0");
  const formattedRandom = `${random.slice(0, 4)}-${random.slice(4, 8)}-${random.slice(8)}`;
  return formattedRandom;
}

export function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  const formattedDate = format(date, "MM/dd/yyyy");
  if (formattedDate === "Invalid Date") {
    throw new Error("Formatting failed");
  }
  return formattedDate;
}

export function isDueBeforeToday(dateString: Date): boolean {
  const date = new Date(dateString);
  const today = new Date();
  // Using UTC dates for comparison helps avoid inconsistencies caused by different timezones.
  return date.toISOString().slice(0, 10) < today.toISOString().slice(0, 10);
}
