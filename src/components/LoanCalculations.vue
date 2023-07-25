<template>
  <div class="table-container">
    <Card>
      <table id="firstTable">
        <thead>
          <tr>
            <th @click="sortBy('mortgageTerm')">Mortgage Term <img class="arrows" src="@/assets/upAndDownArrows.svg" /> </th>
            <th @click="sortBy('monthlyPayment')">Monthly Payment <img class="arrows" src="@/assets/upAndDownArrows.svg" /> </th>
            <th @click="sortBy('interestRate')">Interest Rate <img class="arrows" src="@/assets/upAndDownArrows.svg" /> </th>
            <th @click="sortBy('totalAmount')">Total Amount<img class="arrows" src="@/assets/upAndDownArrows.svg" /> </th>
            <th @click="sortBy('totalOverLoanTerm')">Total over Loan Term <img class="arrows" src="@/assets/upAndDownArrows.svg" /> </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="sortedData && sortedData.length" >
            <TableRow v-for="row in sortedData" :rowData="row" />
          </template>
          <template v-else>
            <tr>
              <td colspan="5">No Loans Yet</td>
            </tr>
          </template>
        </tbody>
      </table>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import TableRow from "./LoanCalculationsRow.vue";
import Card from "./shared/Card.vue";
import { useLoansStore } from "../stores/loans";
import type { LoanCalculationsType } from "./types";


export default defineComponent({
  name: "LoanCalculations",
  components: {
    TableRow,
    Card,
  },
  setup() {
    const loans = ref<LoanCalculationsType[]>([]);
    const store = useLoansStore();

    watch(() => store.loans, (newLoans) => {
      loans.value = newLoans;
    });

    const sortColumn = ref("");
    const sortOrder = ref("");

    const sortBy = (column: string) => {
      if (column === sortColumn.value) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortColumn.value = column;
        sortOrder.value = "asc";
      }
    };

    // Custom sorting function for numeric columns
    const compareNumeric = (a: number, b: number) => a - b;

    // Custom sorting function for mortgage term column (convert "10 years" to a number)
    const compareMortgageTerm = (a: string, b: string) => {
      const aVal = parseInt(a);
      const bVal = parseInt(b);
      return aVal - bVal;
    };

    // Custom function to remove "$" and "," from currency values
    const parseCurrency = (value: string) => parseFloat(value.replace(/[$,]/g, ""));

    // Use the sortedData computed property for the table rows
    const sortedData = computed(() => {
      if (!sortColumn.value) {
        return loans.value;
      }

      const compare = (a: LoanCalculationsType, b: LoanCalculationsType) => {
        const aValue = a[sortColumn.value];
        const bValue = b[sortColumn.value];

        if (sortOrder.value === "asc") {
          if (sortColumn.value === "monthlyPayment" || sortColumn.value === "totalAmount" || sortColumn.value === "totalOverLoanTerm") {
            return compareNumeric(parseCurrency(aValue), parseCurrency(bValue));
          } else if (sortColumn.value === "mortgageTerm") {
            return compareMortgageTerm(aValue, bValue);
          } else if (sortColumn.value === "interestRate") {
            return compareNumeric(parseFloat(aValue.replace("%", "")), parseFloat(bValue.replace("%", "")));
          } else {
            return aValue.localeCompare(bValue);
          }
        } else {
          if (sortColumn.value === "monthlyPayment" || sortColumn.value === "totalAmount" || sortColumn.value === "totalOverLoanTerm") {
            return compareNumeric(parseCurrency(bValue), parseCurrency(aValue));
          } else if (sortColumn.value === "mortgageTerm") {
            return compareMortgageTerm(bValue, aValue);
          } else if (sortColumn.value === "interestRate") {
            return compareNumeric(parseFloat(bValue.replace("%", "")), parseFloat(aValue.replace("%", "")));
          } else {
            return bValue.localeCompare(aValue);
          }
        }
      };

      return loans.value.slice().sort(compare);
    });

    return {
      loans,
      sortedData,
      sortBy,
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
    font-size: .8em;
    text-align: center;
    font-weight: bold;
    color: #818181;
    cursor: pointer;
  }

  td {
    height: 20px;
    text-align: center;
    font-size: .8em;
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

  .arrows {
    filter: invert(78%) sepia(0%) saturate(656%) hue-rotate(151deg) brightness(107%) contrast(77%);
  }
  
  p {
    color: #212121;
  }
  </style>
  