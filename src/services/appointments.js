import axios from "axios";
import { apiUrl } from "../helpers/constants";

const appointmentsService = {
  getUnavailableTimes(payload) {
    return axios.post(`${apiUrl}/appointments/check`, payload);
  },
  createAppointment(payload) {
    return axios.post(`${apiUrl}/appointment/register`, payload);
  },
  getAppointmentList(token) {
    return axios.get(`${apiUrl}/agenda/appointments`, {
      headers: { Authorization: `${token}` },
    });
  },
};
export default appointmentsService;
