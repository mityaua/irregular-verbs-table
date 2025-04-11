import { createApp } from "vue";
import { createGtag } from "vue-gtag";
import "./assets/css/index.css";
import "./style.css";
import App from "./App.vue";

const gtag = createGtag({
	tagId: import.meta.env.VITE_GA_ID,
});

const app = createApp(App);
app.use(gtag);
app.mount("#app");
