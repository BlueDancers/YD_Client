import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";
import "animate.css";
import "./index.css";
import "./utils/rem";
import { Button } from "vant";
import "@vant/touch-emulator";

const app = createApp(App);

app.use(router);
app.mount("#app");

app.use(Button);
