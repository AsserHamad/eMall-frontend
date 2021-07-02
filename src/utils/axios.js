import axios from "axios";

const HTTP = axios.create({
  baseURL: `http://192.168.1.142:5000/api`,
  headers: {
    "Content-Type": "application/json"
  }
});

export default HTTP;