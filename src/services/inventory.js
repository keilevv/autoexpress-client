import axios from "axios";
import { apiUrl } from "../helpers/constants";

const materialsService = {
  getStorageMaterial(token, materialId) {
    return axios.get(`${apiUrl}/inventory/operations/storage/${materialId}`, {
      headers: { Authorization: `${token}` },
    });
  },
  getStorageMaterials(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/inventory/operations/storage/?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  createStorageMaterial(token, payload) {
    return axios.post(`${apiUrl}/inventory/register-storage`, payload, {
      headers: { Authorization: `${token}` },
    });
  },

  deleteStorageMaterial(token, materialId) {
    return axios.delete(
      `${apiUrl}/inventory/operations/delete/storage/${materialId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  updateStorageMaterial(token, materialId, payload) {
    return axios.put(
      `${apiUrl}/inventory/operations/update/storage/${materialId}`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  getConsumptionMaterial(token, materialId) {
    return axios.get(
      `${apiUrl}/inventory/operations/consumption/${materialId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  getConsumptionMaterials(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/inventory/operations/consumption/?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  createConsumptionMaterial(token, payload) {
    return axios.post(`${apiUrl}/inventory/register-consumption`, payload, {
      headers: { Authorization: `${token}` },
    });
  },

  deleteConsumptionMaterial(token, materialId) {
    return axios.delete(
      `${apiUrl}/inventory/operations/delete/consumption/${materialId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  updateConsumptionMaterial(token, materialId, payload) {
    return axios.put(
      `${apiUrl}/inventory/operations/update/consumption/${materialId}`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
};
export default materialsService;
