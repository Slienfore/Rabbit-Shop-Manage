import { useIntersectionObserver } from "@vueuse/core";

export default {
  // el: 指令绑定的元素 -> img
  // binding: binding.value 指令等于号后面绑定的表达式的值 -> img.src
  mounted(el, binding) {
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (!isIntersecting) return;

      // 进入视口区域 -> 绑定 src
      el.src = binding.value;
    });
  },
};
