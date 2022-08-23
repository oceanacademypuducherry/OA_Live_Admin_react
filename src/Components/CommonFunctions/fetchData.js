import axios from "../../index";

const fetchData = ({ apiUrl, bodyData = {}, method = "GET" }) => {
  if (method === "GET") {
    return axios.get(apiUrl, bodyData).then((res) => res.data);
  } else if (method === "POST") {
    return axios.post(apiUrl, bodyData).then((res) => res.data);
  }
};

export { fetchData };
