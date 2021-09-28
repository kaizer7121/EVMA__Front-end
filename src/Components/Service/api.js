import axios from "axios";

let sessionID = localStorage.getItem("AuthSessionID");
const BASE_URL = "http://localhost:3000/";

export default axios.create({
  baseURL: BASE_URL,
});
