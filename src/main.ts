import { createApp } from "vue";
import { configure } from "vue-gtag";
import "./assets/css/index.css";
import "./style.css";
import App from "./App.vue";

configure({
	appName: "EVT",
	tagId: import.meta.env.VITE_GA_ID,
});

const app = createApp(App);
app.mount("#app");
