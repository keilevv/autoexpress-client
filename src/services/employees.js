import axios from "axios";
import { apiUrl } from "../helpers/constants";

const employeesService = {
  getEmployee(token, employeeId) {
    return axios.get(`${apiUrl}/settings/operations/employees/${employeeId}`, {
      headers: { Authorization: `${token}` },
    });
  },
  getEmployees(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/settings/operations/employees/?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  createEmployee(payload) {
    return axios.post(
      `${apiUrl}/settings/operations/register-employee`,
      payload
    );
  },

  updateEmployee(employee, payload) {
    return axios.put(
      `${apiUrl}/settings/operations/update/employees/${employee}`,
      payload
    );
  },
};
export default employeesService;
