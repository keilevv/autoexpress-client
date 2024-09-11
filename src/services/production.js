import axios from "axios";
import { apiUrl } from "../helpers/constants";

const productionService = {
  getJobOrder(token, jobOrderId) {
    return axios.get(
      `${apiUrl}/production/operations/job-orders/${jobOrderId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  getJobOrders(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/production/operations/job-orders/?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  createJobOrder(token, payload) {
    return axios.post(`${apiUrl}/production/register-job-order`, payload, {
      headers: { Authorization: `${token}` },
    });
  },

  updateJobOrder(token, jobOrderId, payload) {
    return axios.put(
      `${apiUrl}/production/operations/update/job-orders/${jobOrderId}`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  addConsumedMaterialsToJobOrder(token, jobOrderId, payload) {
    return axios.put(
      `${apiUrl}/production/operations/job-orders/${jobOrderId}/add-materials`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
};
export default productionService;
