import axios from "axios";

const LOCALHOST = 'http://192.168.1.147:5000/api';
const SERVER = 'http://18.216.71.102:80/api'

const HTTP = axios.create({
  baseURL: SERVER,
  headers: {"Content-Type": "application/json"},
});

HTTP.interceptors.response.use(
  res => res.data,
  err => {console.log(err); return Promise.reject(err)}
)

export default HTTP;