import { useIntersectionObserver } from "@vueuse/core";

export default {
  // el: 指令绑定的元素 -> img
  // binding: binding.value 指令等于号后面绑定的表达式的值 -> img.src
  mounted(el, binding) {
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (!isIntersecting) return;

      // 进入视口区域 -> 绑定 src
      el.src = binding.value;

      stop(); // 第一次加载完图片, 取消监听
    });
  },
};
