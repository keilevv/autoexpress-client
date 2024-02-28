import axios from "axios";
import { apiUrl } from "../helpers/constants";

const userService = {
  login(data) {
    return axios
      .post(`${apiUrl}/auth/login`, { ...data })
      .then((response) => response);
  },
  createUser(data) {
    return axios.post(`${apiUrl}/auth/register`, payload, {
      headers: { Authorization: `JWT ${token}` },
    });
  },
};
export default userService;
