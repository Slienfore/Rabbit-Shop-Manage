import { defineStore } from "pinia";
import { computed, ref } from "vue";

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

    // computed 计算购物车中商品数量
    const allCount = computed(() =>
      cartList.value.reduce((acc, item) => acc + item.count, 0)
    );

    // computed 计算购物车中商品总价值
    const allPrice = computed(() =>
      cartList.value.reduce((acc, item) => acc + item.count * item.price, 0)
    );

    return {
      cartList,
      allCount,
      allPrice,
      addCart,
      delCart,
    };
  },
  { persist: true }
);
