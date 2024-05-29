import { loginAPI } from "@/apis/user";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();

    const userInfo = ref({});

    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });

      userInfo.value = res.result;

      // 登录时候, 将本地购物车与服务器购物车进行合并
      await mergeCartAPI(
        cartStore.cartList.map((item) => ({
          skuId: item.skuId,
          selected: item.selected,
          count: item.count,
        }))
      );

      cartStore.updateNewList(); // 更新购物车列表
    };

    const clearUserInfo = () => {
      userInfo.value = {};
      cartStore.cleanCart(); // 清除当前购物车信息
    };

    return { userInfo, getUserInfo, clearUserInfo };
  },
  { persist: true }
);
