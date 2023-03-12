import axios from "axios";

const axiosClient = axios.create({
    baseURL: `https://raw.githubusercontent.com/roshanshibu/CocoBackend/master/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
});

export default axiosClient;