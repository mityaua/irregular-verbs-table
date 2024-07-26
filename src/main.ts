import { createApp } from "vue";
import VueGtag from "vue-gtag";
import "./index.css";
import "./style.css";
import App from "./App.vue";

const analyticsConfig = {
	config: { id: import.meta.env.VITE_GA_ID },
};

const app = createApp(App);
app.use(VueGtag, analyticsConfig);
app.mount("#app");
