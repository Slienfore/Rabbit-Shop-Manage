import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";

export default function useBanner() {
  // 轮播图
  const bannerList = ref([]);

  const getBanner = async () => {
    const res = await getBannerAPI({ distributionSite: "2" });

    bannerList.value = res.result;
  };

  onMounted(() => getBanner());

  return { bannerList };
}
