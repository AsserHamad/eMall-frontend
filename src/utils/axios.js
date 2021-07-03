import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UNAUTHORIZED = 401;

const HTTP = axios.create({
  baseURL: `http://192.168.1.147:5000/api`,
  headers: {
    "Content-Type": "application/json"
  },
});

HTTP.interceptors.response.use(
  res => res.data,
  error => {
    const { status } = error.response;
    if(status === UNAUTHORIZED) { 
      return Promise.reject(err);
    } else return Promise.reject(err);
  }
)

export default HTTP;