import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { initFaLibrary, FontAwesomeIcon } from "@/plugins/fontAwesome";
const app = createApp(App);

initFaLibrary();

app.use(router);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
