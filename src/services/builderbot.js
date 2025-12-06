import axios from "axios";
import { apiUrl } from "../helpers/constants";

const builderbotService = {
  getSession(token) {
    return axios.get(`${apiUrl}/builderbot/get-session`, {
      headers: { Authorization: `${token}` },
    });
  },
};
export default builderbotService;