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

    // 删除购物车
    const delCart = (skuId) => {
      const i = cartList.value.findIndex((item) => item.skuId === skuId);

      cartList.value.splice(i, 1);
    };

    return {
      cartList,
      addCart,
      delCart
    };
  },
  { persist: true }
);
