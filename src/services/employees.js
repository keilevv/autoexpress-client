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

  createEmployee(token, payload) {
    return axios.post(
      `${apiUrl}/settings/operations/register-employee`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },

  updateEmployee(token, employee, payload) {
    return axios.put(
      `${apiUrl}/settings/operations/update/employees/${employee}`,
      payload,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  deleteEmployee(token, employeeId) {
    return axios.delete(
      `${apiUrl}/settings/operations/employee/${employeeId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
};
export default employeesService;
