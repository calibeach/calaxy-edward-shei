<template>
  <!-- This template defines the form for entering invoice details. -->

  <div class="form-container">
    <Card>
      <!-- This header displays the invoice number. -->

      <header class="invoiceContainer">Invoice# {{ invoiceDetails.invoiceNumber }}</header>
      <form @submit.prevent="handleSubmit">
        <div>
          <!-- This input field allows the user to enter the recipient of the invoice. -->

          <BaseInput
            id="recipient"
            labelText="Recipient:"
            type="text"
            v-model="invoiceDetails.recipient"
            class="recipient-input"
            ref="recipientInput"
          />
        </div>
        <div class="date-container">
          <div class="date-picker-container">
            <!-- This date picker allows the user to select the invoice creation date. -->

            <label for="invoiceCreated">Invoice Date:</label>
            <DatePicker v-model="invoiceDetails.invoiceCreated" :popover="{ visibility: 'click' }">
              <template #default="{ inputValue, inputEvents }">
                <!-- This input field displays the selected date. -->
                <BaseInput v-on="inputEvents" :modelValue="inputValue" />
              </template>
            </DatePicker>
          </div>
          <div class="date-picker-container">
            <!-- This date picker allows the user to select the invoice due date. -->

            <label for="invoiceDue">Invoice Due Date:</label>
            <DatePicker v-model="invoiceDetails.invoiceDue" :popover="{ visibility: 'click' }">
              <template #default="{ inputValue, inputEvents }">
                <!-- This input field displays the selected date. -->

                <BaseInput :value="inputValue" v-on="inputEvents" :modelValue="inputValue" />
              </template>
            </DatePicker>
          </div>
        </div>
        <div class="item-container">
          <!-- This allows the user add description and amounts of invoice items. -->

          <div>
            <BaseInput
              id="itemDescription"
              labelText="Item Description:"
              type="text"
              v-model="invoiceDetails.itemDescription"
              class="item-description-input"
            />
          </div>
          <div>
            <BaseInput
              id="itemAmount"
              labelText="Item Amount:"
              type="number"
              v-model.number="invoiceDetails.itemAmount"
            />
          </div>
          <!-- This button adds the current item to the invoice. -->

          <button @click.prevent="addItem" class="add-item-button"><i class="fas fa-plus"></i></button>
        </div>
        <div class="notes-container">
          <label for="notes" class="additional-comments-label">Notes:</label>
          <textarea id="notes" class="notes-textarea" v-model="invoiceDetails.notes"></textarea>
        </div>
        <ItemTable :items="invoiceDetails.items" :total-amount="invoiceDetails.totalAmount" />
        <button type="submit" class="create-invoice">Create Invoice</button>
      </form>
    </Card>
  </div>
</template>

<script lang="ts">
import Card from "./shared/Card.vue";
import ItemTable from "./ItemTable.vue";
import { defineComponent, ref } from "vue";
import { postInvoice } from "../apis/index";
import BaseInput from "./shared/BaseInput.vue";
import type { InvoiceDetails } from "./types/index";
import { useInvoicesStore } from "../stores/invoices";
import { generateInvoiceNumber } from "../helpers/index";
// @ts-ignore
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default defineComponent({
  name: "InvoiceDetailsForm",
  methods: {
    handleSubmit(): void {
      const store = useInvoicesStore();
      // Add the current invoice to the store.
      store.addInvoice(this.invoiceDetails);

      // Post the current invoice to the server.
      postInvoice(this.invoiceDetails);

      // Reset the invoice details to their initial values.
      this.invoiceDetails = {
        invoiceNumber: generateInvoiceNumber(),
        recipient: "",
        totalAmount: 0,
        invoiceCreated: new Date(),
        invoiceDue: new Date(),
        items: [],
        itemDescription: "",
        itemAmount: 0,
        notes: "",
      };
    },
    setup() {
      // Create a reactive and return a reactive date object to be used in the form.
      const date = ref(new Date());

      function updateDate() {
        date.value = new Date();
      }

      return {
        currentDate: date,
        updateDate,
      };
    },
    addItem() {
      // Create a new item object with the description and amount from the form.
      const newItem = {
        description: this.invoiceDetails.itemDescription,
        amount: Number(this.invoiceDetails.itemAmount.toFixed(2)),
      };

      // Add the new item to the list of items in the invoice details.
      this.invoiceDetails.items.push(newItem);

      // Reset the item description and amount fields to their initial values.
      this.invoiceDetails.itemDescription = "";
      this.invoiceDetails.itemAmount = 0;

      // Update the total amount of the invoice.
      this.invoiceDetails.totalAmount = this.totalAmount;
    },
  },
  computed: {
    // Use a computed property to calculate the total amount
    totalAmount(): number {
      return Number(this.invoiceDetails.items.reduce((total, item) => total + item.amount, 0).toFixed(2));
    },
  },
  components: {
    Card,
    BaseInput,
    ItemTable,
    Calendar,
    DatePicker,
  },
  data() {
    return {
      invoiceDetails: {
        invoiceNumber: "",
        recipient: "",
        totalAmount: 0,
        invoiceCreated: new Date(),
        invoiceDue: new Date(),
        items: [],
        itemDescription: "",
        itemAmount: 0,
        notes: "",
      } as InvoiceDetails,
    };
  },
  created() {
    // Generate a new invoice number and set it as the initial value for the invoice number field.
    this.invoiceDetails.invoiceNumber = generateInvoiceNumber();
  },
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 12px;
  color: #818181;
  white-space: nowrap;
}
header span {
  font-size: 18px;
  font-weight: normal;
  margin-left: 10px;
}

textarea {
  /* Existing CSS rules here */
  border-color: #ccc;
  resize: none;
}

label {
  color: #2c4e7d;
  font-weight: 550;
  font-size: 12px;
  margin-left: 6px;
}
.notes-textarea {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  padding: 4px;
}
.notes-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.date-container {
  display: flex;
  justify-content: space-between;
  margin-right: 24px;
}

.item-container {
  display: flex; /* Add display: flex to item container */
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.add-item-button {
  background-color: #2491eb;
  border: none;
  cursor: pointer;
  padding: 2px;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-top: auto;
  margin-left: 4px;
  margin-bottom: 8px;
}

.form-container {
  margin-right: 1em;
  min-width: 30vw;
}

.create-invoice {
  margin-top: 0.8em;
  background-color: #2491eb;
  color: white;
  border: none;
  padding: 0.5em;
  border-radius: 8px;
  min-width: 12.8em;
  font-weight: 600;
}
</style>
