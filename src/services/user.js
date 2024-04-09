import axios from "axios";
import { apiUrl } from "../helpers/constants";

const userService = {
  login(data) {
    return axios
      .post(`${apiUrl}/auth/login`, { ...data })
      .then((response) => response);
  },
  createUser(payload) {
    return axios.post(`${apiUrl}/auth/register`, payload, {
      headers: { Authorization: `JWT ${token}` },
    });
  },
  getUser(token, userId) {
    return axios.get(`${apiUrl}/users/${userId}`, {
      headers: { Authorization: `${token}` },
    });
  },
};
export default userService;
