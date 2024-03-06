import axios from "axios";
import { apiUrl } from "../helpers/constants";

const appointmentsService = {
  getUnavailableTimes(payload) {
    return axios.post(`${apiUrl}/appointments/check`, payload);
  },
  createAppointment(payload) {
    return axios.post(`${apiUrl}/appointment/register`, payload);
  },
};
export default appointmentsService;
