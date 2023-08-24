import "./assets/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
// @ts-ignore
import { setupCalendar } from "v-calendar";

import { createApp } from "vue";
import { createPinia } from "pinia";

// @ts-ignore
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(setupCalendar, {});

app.mount("#app");
