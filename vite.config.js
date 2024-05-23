import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 配置 ElementPlus 按需导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需引入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 配置 Element 采用 sass 样式配色系统
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        // 配置 scss 全局变量
        additionalData: `@use "@/styles/element/index.scss" as *;
                         @use "@/styles/var.scss" as *;`,
      },
    },
  },
  resolve: {
    // 实际路径转化 @ -> src
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
