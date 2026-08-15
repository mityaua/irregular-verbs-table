import { createApp } from "vue";

import { configure } from "vue-gtag";

import App from "./App.vue";

import "./assets/css/index.css";
import "./style.css";

configure({
	appName: "EVT",
	tagId: import.meta.env.VITE_GA_ID,
});

const app = createApp(App);
app.mount("#app");
