import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/styles/common.scss";
import directives from "./directives";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(directives); // 注册指令

app.mount("#app");
