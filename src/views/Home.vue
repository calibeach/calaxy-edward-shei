<template>
  <div class="home">
    <Header />
    <div class="container">
      <LoanDetailsForm />
      <LoanCalculations />
    </div>
  </div>
</template>

<script lang="ts">
  import Header from "@/components/Header.vue";
  import LoanDetailsForm from "@/components/LoanDetailsForm.vue";
  import LoanCalculations from "@/components/LoanCalculations.vue";

  export default {
    name: "Home",
    components: {
      Header,
      LoanDetailsForm,
      LoanCalculations
    }
  };
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  h1 {
    color: #212121;
  }
</style>