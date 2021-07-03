import axios from "axios";

const UNAUTHORIZED = 401;

const HTTP = axios.create({
  baseURL: `http://192.168.1.142:5000/api`,
  headers: {
    "Content-Type": "application/json"
  },
});

HTTP.interceptors.response.use(
  res => res.data,
  // error => {
  //   const { status } = error.response;
  //   if(status === UNAUTHORIZED) {

  //   } else return Promise.reject(err);
  // }
)

export default HTTP;