import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { getCategoryAPI } from "@/apis/category";

export default function useCategory() {
  // 路由对象 -> 一级分类 id
  const route = useRoute();

  const categoryData = ref({});

  const getCategory = async () => {
    const res = await getCategoryAPI(route.params.id);

    categoryData.value = res.result;
  };

  watchEffect(() => getCategory());

  return { categoryData };
}
