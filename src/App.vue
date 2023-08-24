<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

body {
  font-family: "Poppins", sans-serif;
  line-height: 1.6;
  background: #F4f4f4;
}

.app {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

 </style>
