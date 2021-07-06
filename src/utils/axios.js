import axios from "axios";

const LOCALHOST = 'http://localhost:5000/';
const SERVER = 'http://18.216.71.102:80/'

const HTTP = axios.create({
  baseURL: `${SERVER}/api`,
  headers: {"Content-Type": "application/json"},
});

HTTP.interceptors.response.use(
  res => res.data
)

export default HTTP;