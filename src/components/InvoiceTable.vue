<template>
  <div class="table-container">
    <Card>
      <table id="firstTable">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Recipient</th>
            <th>Invoice Created</th>
            <th>Invoice Due</th>
            <th>Is Late</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="invoices && invoices.length">
            <TableRow v-for="row in invoices" :rowData="row" />
          </template>
          <template v-else>
            <tr>
              <td colspan="6">No Invoices</td>
            </tr>
          </template>
        </tbody>
      </table>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import TableRow from "./InvoiceTableRow.vue";
import Card from "./shared/Card.vue";
import { useInvoicesStore } from "../stores/invoices";
import type { InvoiceDetails } from "./types";
import { fetchInvoices } from "@/apis";

export default defineComponent({
  name: "InvoiceTable",
  components: {
    TableRow,
    Card,
  },
  data(): { invoices: InvoiceDetails[] } {
    return {
      invoices: [],
    };
  },
  methods: {
    async fetchInvoices() {
      this.invoices = await fetchInvoices();
      return this.invoices;
    },
  },
  setup() {
    const invoices = ref<InvoiceDetails[]>([]);
    const store = useInvoicesStore();

    onMounted(async () => {
      // Fetch invoices from API and set them in the store
      const fetchedInvoices = await fetchInvoices();
      store.setInvoices(fetchedInvoices);
    });

    watch(
      () => store.invoices,
      (newInvoices) => {
        // Update the invoices when the store changes
        invoices.value = newInvoices;
        console.log("New invoices:", newInvoices);
      },
    );

    return {
      invoices,
    };
  },
});
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  white-space: nowrap;
  padding: 8px;
  font-size: 0.8em;
  text-align: center;
  font-weight: bold;
  color: #818181;
}

td {
  height: 20px;
  text-align: center;
  font-size: 0.8em;
  color: #818181;
}

h1 {
  color: #212121;
}

tr {
  border-bottom: 1px solid #e0e0d9;
}
img {
  vertical-align: middle;
  width: 12px;
  height: 12px;
}

p {
  color: #212121;
}
</style>
