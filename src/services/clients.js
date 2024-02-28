import axios from "axios";
import { apiUrl } from "../helpers/constants";

const clientsService = {
  getClients(token) {
    return axios.get(`${apiUrl}/clients`, {
      headers: { Authorization: `${token}` },
    });
  },
  createClient(payload) {
    return axios.post(`${apiUrl}/client/register`, payload);
  },
};
export default clientsService;
