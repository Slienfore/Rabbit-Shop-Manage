import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);

    const addCart = (goods) => {
      // 添加购物车, 找得到的话, 数量加一, 找不到的话, 添加商品
      const item = cartList.value.find((item) => goods.skuId === item.skuId);

      if (item) {
        item.count += goods.count;
      } else {
        cartList.value.push(goods);
      }
    };

    return {
      cartList,
      addCart,
    };
  },
  { persist: true }
);
