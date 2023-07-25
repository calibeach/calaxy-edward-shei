<template>
    <tr>
      <td v-for="(value, key) in rowData" :key="key">{{ value }}</td>
    </tr>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import type { PropType } from "vue";
  
  export default defineComponent({
    name: "TableRow",
    props: {
      rowData: {
        type: Object as PropType<{ [key: string]: string | number }>,
        required: true,
      },
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
  </style>