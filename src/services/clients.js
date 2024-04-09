import axios from "axios";
import { apiUrl } from "../helpers/constants";

const clientsService = {
  getClients(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/clients/operations/?page=${page}&limit=${limit}&filter=${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  getClientListByName(token, name) {
    return axios.get(`${apiUrl}/clients/operations/name/${name}`, {
      headers: { Authorization: `${token}` },
    });
  },
  createClient(payload) {
    return axios.post(`${apiUrl}/clients/register`, payload);
  },
  getClientByCountryId(countryId) {
    return axios.get(`${apiUrl}/clients/country-id/${countryId}`);
  },
  updateClient(clientId, payload) {
    return axios.put(`${apiUrl}/clients/update/${clientId}`, payload);
  },
};
export default clientsService;
