import axios from "axios";
import { apiUrl } from "../helpers/constants";

const dashboardService = {
  getFinancialMetrics(token, filter) {
    return axios.get(`${apiUrl}/dashboard/?${filter}`, {
      headers: { Authorization: `${token}` },
    });
  },
};
export default dashboardService;
