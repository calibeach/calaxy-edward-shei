import { mount } from "@vue/test-utils";
import InvoiceTable from "@/components/InvoiceTable.vue";
import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";

describe("InvoiceTable", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("renders no invoices message when there are no invoices", () => {
    const wrapper = mount(InvoiceTable);
    expect(wrapper.text()).toContain("No Invoices");
  });
});
