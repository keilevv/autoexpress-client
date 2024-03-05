import axios from "axios";
import { apiUrl } from "../helpers/constants";

const appointmentsService = {
  getUnavailableTimes(payload) {
    return axios.post(`${apiUrl}/appointments/check`, payload);
  },
};
export default appointmentsService;
