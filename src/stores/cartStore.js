import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { delCartAPI, findNewCartListAPI, insertCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();

    // computed 判断是否登录
    const isLogin = computed(() => userStore.userInfo.token);

    const cartList = ref([]);

    const addCart = async (goods) => {
      const { skuId, count } = goods;
      // 已登录
      if (isLogin.value) {
        // 添加购物车
        await insertCartAPI({ skuId, count });
        // 获取最新购物车列表
        const res = await findNewCartListAPI();

        cartList.value = res.result;
      } else {
        // 添加购物车, 找得到的话, 数量加一, 找不到的话, 添加商品
        const item = cartList.value.find((item) => goods.skuId === item.skuId);

        if (item) {
          item.count += goods.count;
        } else {
          cartList.value.push(goods);
        }
      }
    };

    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 删除购物车
        await delCartAPI([skuId]);

        // 获取最新购物车列表
        const res = await findNewCartListAPI();

        cartList.value = res.result;
      } else {
        const i = cartList.value.findIndex((item) => item.skuId === skuId);

        cartList.value.splice(i, 1);
      }
    };

    // 单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // computed 计算购物车中商品数量
    const allCount = computed(() =>
      cartList.value.reduce((acc, item) => acc + item.count, 0)
    );

    // computed 计算购物车中商品总价值
    const allPrice = computed(() =>
      cartList.value.reduce((acc, item) => acc + item.count * item.price, 0)
    );

    // computed 计算购物车中的已选商品数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );

    // computed 计算已选商品价钱
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );

    // computed 计算购物车中是否是全部选中状态
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    return {
      cartList,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
      isAll,
      addCart,
      delCart,
      singleCheck,
      allCheck,
    };
  },
  { persist: true }
);
