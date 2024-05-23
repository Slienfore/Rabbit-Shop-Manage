import axios from "axios";

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// request interceptor
httpInstance.interceptors.request.use(
  (config) => config,
  (e) => Promise.reject(e)
);

// response interceptor
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => Promise.reject(e)
);

export default httpInstance;
