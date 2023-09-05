import axios from "axios";
const baseURL = "http://localhost:8080";

const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json"
    }
  });

  export default httpClient;