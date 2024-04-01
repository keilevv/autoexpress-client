import axios from "axios";
import { apiUrl } from "../helpers/constants";

const appointmentsService = {
  getUnavailableTimes(payload) {
    return axios.post(`${apiUrl}/appointments/check`, payload);
  },
  createAppointment(payload) {
    return axios.post(`${apiUrl}/appointment/register`, payload);
  },
  getAppointmentList(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/agenda/appointments/?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
};
export default appointmentsService;
