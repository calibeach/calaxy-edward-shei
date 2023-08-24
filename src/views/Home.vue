<template>
  <div class="home">
    <Header />
    <div class="container">
      <InvoiceDetailsForm />
      <InvoiceTable />
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import InvoiceDetailsForm from "@/components/InvoiceDetailsForm.vue";
import InvoiceTable from "@/components/InvoiceTable.vue";

export default {
  name: "Home",
  components: {
    Header,
    InvoiceDetailsForm,
    InvoiceTable,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  color: #212121;
}
</style>
