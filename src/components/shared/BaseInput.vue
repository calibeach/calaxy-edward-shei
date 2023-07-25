<template>
    <div class="input-container">
    <label :for="id">{{ labelText }}</label>
    <input
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :id="id"
      :placeholder="placeHolder"
      :type="type"
    />
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      labelText: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
    placeHolder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    },
  };
  </script>

<style scoped>
  label {
    color: #2C4E7D;
    font-weight: 550;
  }

  .input-container {
    margin-bottom: 0.9em;
  }

  ::placeholder {
    color: #818181;
  }
</style>

