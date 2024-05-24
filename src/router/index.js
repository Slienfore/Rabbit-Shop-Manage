import { createRouter, createWebHistory } from "vue-router";
import { Layout, Login, Home, Category } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          // default
          path: "",
          component: Home,
        },
        {
          path: "category/:id",
          component: Category,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});

export default router;
