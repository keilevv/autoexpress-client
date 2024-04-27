import axios from "axios";
import { apiUrl } from "../helpers/constants";

const appointmentsService = {
  getAppointment(token, appointmentId) {
    return axios.get(`${apiUrl}/appointments/operations/${appointmentId}`, {
      headers: { Authorization: `${token}` },
    });
  },
  getUnavailableTimes(payload) {
    return axios.post(`${apiUrl}/appointments/check`, payload);
  },
  createAppointment(payload) {
    return axios.post(`${apiUrl}/appointments/register`, payload);
  },
  getAppointmentList(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/appointments/agenda?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  updateAppointment(token, appointmentId, payload) {
    return axios.put(
      `${apiUrl}/appointments/update/${appointmentId}`,
      payload,
      { headers: { Authorization: `${token}` } }
    );
  },
};
export default appointmentsService;
