import axios from "axios";
import { apiUrl } from "../helpers/constants";

const materialsService = {
  getStorageMaterial(token, materialId) {
    return axios.get(`${apiUrl}/materials/operations/${materialId}`, {
      headers: { Authorization: `${token}` },
    });
  },
  getStorageMaterials(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/materials/operations/storage/?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  createStorageMaterial(token, payload) {
    return axios.post(`${apiUrl}/materials/register-storage`, payload, {
      headers: { Authorization: `${token}` },
    });
  },

  deleteStorageMaterial(token, materialId) {
    return axios.delete(
      `${apiUrl}/materials/operations/delete/storage/${materialId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  updateStorageMaterial(token, materialId, payload) {
    return axios.put(
      `${apiUrl}/materials/operations/update/${materialId}`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
};
export default materialsService;
