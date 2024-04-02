import axios from "axios";
import { apiUrl } from "../helpers/constants";

const messagesService = {
  createMessage(payload) {
    return axios.post(`${apiUrl}/message/register`, payload);
  },
  getMessagesList(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/operations/messages/?page=${page}&limit=${limit}&filter=${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  getMessage(token, userId) {
    return axios.get(`${apiUrl}/operations/message/${userId}`, {
      headers: { Authorization: `${token}` },
    });
  },
};
export default messagesService;
