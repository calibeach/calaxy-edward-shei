import { describe, it, expect, beforeEach, vitest } from "vitest";
import { generateInvoiceNumber, formatDate, isDueBeforeToday } from "../../helpers/index";


describe("test generateInvoiceNumber", () => {
  it("should generate a string with length of 12", () => {
    const invoiceNumber = generateInvoiceNumber();
    expect(invoiceNumber.length).toBe(12);
  });
  it("should generate a unique string on each call", () => {
    const invoiceNumber1 = generateInvoiceNumber();
    const invoiceNumber2 = generateInvoiceNumber();
    expect(invoiceNumber1).not.toBe(invoiceNumber2);
  });

  it("should return a string", () => {
    const invoiceNumber = generateInvoiceNumber();
    expect(typeof invoiceNumber).toBe("string");
  });
});

describe("test formatDate", () => {
  it('should return a string in the format "MM/dd/yyyy" when given a valid Date object', () => {
    const date = new Date(2022, 0, 1);
    const result = formatDate(date);
    expect(result).toBe("01/01/2022");
  });

  it("should return the same formatted string for the same input Date object", () => {
    const date = new Date(2022, 0, 1);
    const result1 = formatDate(date);
    const result2 = formatDate(date);
    expect(result1).toBe(result2);
  });

  it('should throw an error with message "Invalid date" when given an invalid Date object', () => {
    const invalidDate = new Date("invalid");
    expect(() => formatDate(invalidDate)).toThrowError("Invalid date");
  });
});

describe("test isDueBeforeToday", () => {
  it("should return true when given a date string that is before today's date", () => {
    const result = isDueBeforeToday(new Date("2021-01-01"));
    expect(result).toBe(true);
  });

  it("should return false when given a date string that is exactly today's date", () => {
    const result = isDueBeforeToday(new Date());
    expect(result).toBe(false);
  });

  it("should return false when given a date string that is after today's date", () => {
    const result = isDueBeforeToday(new Date("3000-01-01"));

    expect(result).toBe(false);
  });
});
