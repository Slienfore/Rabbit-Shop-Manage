import { createRouter, createWebHistory } from "vue-router";
import {
  Layout,
  Login,
  Home,
  Category,
  SubCategory,
  Detail,
  CartList,
} from "@/views";

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
        {
          path: "category/sub/:id",
          component: SubCategory,
        },
        {
          path: "detail/:id",
          component: Detail,
        },
        {
          path: "cartlist",
          component: CartList,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
  // 定制路由滚动行为
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
