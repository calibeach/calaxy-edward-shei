<template>
    <div class="card">
      <slot></slot>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: "Card",
  });
  </script>
  
  <style scoped>
  .card {
    background: #FFFFFF;
    color: #212121;
    border-radius: 12px;
  }
  </style>