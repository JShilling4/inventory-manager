import { createApp } from "vue";
import pinia from "./plugins/pinia";
import { Notify, Quasar } from "quasar";
import App from "./App.vue";
import router from "@/router";
import iconSet from "quasar/icon-set/fontawesome-v6";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "quasar/dist/quasar.css";
import { initFaLibrary, FontAwesomeIcon } from "@/plugins/fontAwesome";

initFaLibrary();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(Quasar, {
  plugins: { Notify },
  iconSet: iconSet,
  config: {
    notify: {
      position: "top",
    },
  },
});
app.mount("#app");
