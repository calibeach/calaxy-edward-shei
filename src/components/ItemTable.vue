<template>
  <div>
    <table class="item-table">
      <thead>
        <tr>
          <th>Item Description</th>
          <th>Item Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.description }}</td>
          <td>{{ item.amount }}</td>
        </tr>
        <tr v-if="items.length === 0">
          <td colspan="2">No Items</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total:</td>
          <td>{{ totalAmount }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Item {
  description: string;
  amount: number;
}

export default defineComponent({
  name: "ItemTable",
  props: {
    items: {
      type: Array as () => Item[],
      default: () => [],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style>
.item-table {
  border-collapse: collapse;
  width: 100%;
}

.item-table th,
.item-table td {
  border: 1px solid #ddd;
  padding: 4px;
  text-align: left;
  font-size: 12px;
}

.item-table th {
  background-color: #2491eb;
  color: white;
}

.item-table tfoot td {
  font-weight: bold;
}
</style>
