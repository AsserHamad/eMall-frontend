import axios from "axios";

const LOCALHOST = 'http://192.168.1.147:5000/api';
const SERVER = 'http://18.216.71.102:80/api'

const HTTP = axios.create({
  baseURL: LOCALHOST,
  headers: {"Content-Type": "application/json"},
});

HTTP.interceptors.response.use(
  res => res.data,
  err => {return Promise.reject(err.response)}
)

export default HTTP;