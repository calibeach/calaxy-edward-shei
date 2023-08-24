<template>
  <div class="input-container">
    <label :for="id">{{ labelText }}</label>
    <input
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :id="id"
      :placeholder="placeHolder"
      :type="type"
      :readonly="readonly"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    labelText: {
      type: String,
      required: false,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
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
  color: #2c4e7d;
  font-weight: 550;
  font-size: 12px;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 4px;
}

input {
  padding: 4px 12px;
  font-size: 0.9em;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  color: #818181;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-container label {
  margin-bottom: 0px;
}
::placeholder {
  color: #818181;
}
</style>
