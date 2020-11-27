import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://ec2-3-35-88-123.ap-northeast-2.compute.amazonaws.com:8080",
});
