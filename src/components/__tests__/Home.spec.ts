import Header from "../Header.vue";
import Home from "@/views/Home.vue";
import { describe, it, expect } from "vitest";
import InvoiceTable from "../InvoiceTable.vue";
import { shallowMount } from "@vue/test-utils";
import InvoiceDetailsForm from "@/components/InvoiceDetailsForm.vue";

describe("Home.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.exists()).toBe(true);
  });

  it("contains Header component", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.findComponent(Header).exists()).toBe(true);
  });

  it("contains InvoiceDetailsForm component", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.findComponent(InvoiceDetailsForm).exists()).toBe(true);
  });

  it("contains InvoiceTable component", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.findComponent(InvoiceTable).exists()).toBe(true);
  });
});
