import { useUserStore } from "@/stores/user";
import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import router from "@/router";

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
});

// request interceptor
httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (e) => Promise.reject(e)
);

// response interceptor
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();

    ElMessage({ type: "warning", message: e.response.data.message });

    // token 过期
    if (e.response.status === 401) {
      userStore.clearUserInfo(); // 清除信息
      router.push("/login"); // 进行登录
    }

    return Promise.reject(e);
  }
);

export default httpInstance;
