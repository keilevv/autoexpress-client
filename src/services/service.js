import axios from "axios";
import { apiUrl } from "../helpers/constants";

const servicesService = {
  getService(token, serviceId) {
    return axios.get(`${apiUrl}/services/${serviceId}`, {
      headers: { Authorization: `${token}` },
    });
  },
  getServices(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/services/?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      },
    );
  },

  createService(token, payload) {
    return axios.post(`${apiUrl}/services`, payload, {
      headers: { Authorization: `${token}` },
    });
  },

  deleteService(token, serviceId) {
    return axios.delete(
      `${apiUrl}/services/${serviceId}`,
      {
        headers: { Authorization: `${token}` },
      },
    );
  },

  updateService(token, serviceId, payload) {
    return axios.put(
      `${apiUrl}/services/${serviceId}`,
      payload,
      {
        headers: { Authorization: `${token}` },
      },
    );
  },
};

export default servicesService;
