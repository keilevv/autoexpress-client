import axios from "axios";
import { apiUrl } from "../helpers/constants";

const clientsService = {
  getClients(token) {
    return axios.get(`${apiUrl}/operations/clients`, {
      headers: { Authorization: `${token}` },
    });
  },
  getClientListByName(token, name) {
    return axios.get(`${apiUrl}/operations/clients/name/${name}`, {
      headers: { Authorization: `${token}` },
    });
  },
  createClient(payload) {
    return axios.post(`${apiUrl}/client/register`, payload);
  },
  getClientByCountryId(countryId) {
    return axios.get(`${apiUrl}/client/country-id/${countryId}`);
  },
  updateClient(clientId, payload) {
    return axios.put(`${apiUrl}/client/update/${clientId}`, payload);
  },
};
export default clientsService;
