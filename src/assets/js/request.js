import axios from "axios";

const instance = axios.create({
  timeout: 5000
});

export function request(config) {
  instance.interceptors.request.use((config) => {
    config.headers["X-Agent"] = "Juejin/xiaomi/Redmi Note 7 Pro Android/9 Juejin/Android/5.9.3";
    return config;
  }, (error) => {
    console.log(error);
  });

  instance.interceptors.response.use((data) => {
    return data;
  }, (error) => {
    console.log(error);
  });

  return instance(config);

}
