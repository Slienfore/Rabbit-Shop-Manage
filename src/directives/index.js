import LazyImage from "./LazyImage";

const directives = {
  LazyImage, // 图片懒加载指令
};

// plugin 形式交给 App 管理, 注册全局指令
export default {
  install(app) {
    for (const [key, directive] of Object.entries(directives)) {
      app.directive(key, directive);
    }
  },
};
