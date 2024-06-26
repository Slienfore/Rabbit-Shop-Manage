<script setup lang="ts">
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from "../Home/components/GoodsItem.vue";

const route = useRoute();

const categoryData = ref({});

const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id);

  categoryData.value = res.result;
};

onMounted(() => getCategoryData());

const goodList = ref([]);
const query = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});

const getGoodList = async () => {
  const res = await getSubCategoryAPI(query.value);

  goodList.value = res.result.items;
};

onMounted(() => getGoodList());

const handleTabChange = () => {
  query.value.page = 1; // 重置
  getGoodList();
};

const disabledInfiniteLoad = ref(false);
// 商品无限加载
const handleInfiniteLoad = async () => {
  // 加页
  ++query.value.page;

  const res = await getSubCategoryAPI(query.value);

  // 没有数据了
  if (!res.result.items.length) return (disabledInfiniteLoad.value = false); // 禁用

  // 新、老数据拼接
  goodList.value = [...goodList.value, ...res.result.items];
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: `/category/${categoryData.parentId}` }"
          >{{ categoryData.parentName }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs @tab-change="handleTabChange" v-model="query.sortField">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        v-infinite-scroll="handleInfiniteLoad"
        :infinite-scroll-disabled="disabledInfiniteLoad"
        class="body"
      >
        <!-- 商品列表-->
        <GoodsItem v-for="good in goodList" :good="good" :key="good.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
