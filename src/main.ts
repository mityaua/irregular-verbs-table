import { createApp } from "vue";
import VueGtag from "vue-gtag";
import "./index.css";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(VueGtag, {
	config: { id: "G-0JXW9ZJB5B" },
});
app.mount("#app");
