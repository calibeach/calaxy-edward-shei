<template>
  <tr>
    <td>{{ rowData.invoiceNumber }}</td>
    <td>{{ rowData.recipient }}</td>
    <td>{{ formatDate(rowData.invoiceCreated) }}</td>
    <td>{{ formatDate(rowData.invoiceDue) }}</td>
    <td>
      <span v-if="isDueBeforeToday(rowData.invoiceDue)">
        <i class="fas fa-circle red-light" data-delay="10" title="Invoice is past due"></i>
      </span>
      <span v-else>
        <i data-delay="10" class="fas fa-circle green-light" title="Invoice is not past due"></i>
      </span>
    </td>
    <td>{{ rowData.totalAmount }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate, isDueBeforeToday } from "@/helpers";
import type { InvoiceDetails } from "../components/types/index";

export default defineComponent({
  name: "InvoiceTableRow",
  props: {
    rowData: {
      type: Object as () => InvoiceDetails,
      required: true,
    },
  },
  methods: {
    formatDate,
    isDueBeforeToday,
  },
});
</script>

<style scoped>
tr {
  border-bottom: 1px solid #e0e0d9;
}

td {
  padding: 0.1em;
  text-align: center;
  font-size: 0.8em;
  color: #818181;
}

.red-light {
  color: red;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
.green-light {
  color: green;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
</style>
