import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "@/styles/common.scss";
import directives from "./directives";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);// 使用 pinia 持久化 state
app.use(pinia);
app.use(router);
app.use(directives); // 注册指令

app.mount("#app");
