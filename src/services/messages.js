import axios from "axios";
import { apiUrl } from "../helpers/constants";

const messagesService = {
  createMessage(payload) {
    return axios.post(`${apiUrl}/messages/register`, payload);
  },
  getMessagesList(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/messages/operations/?page=${page}&limit=${limit}${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  getMessage(token, userId) {
    return axios.get(`${apiUrl}/operations/messages/${userId}`, {
      headers: { Authorization: `${token}` },
    });
  },
  updateMessage(messageId, payload) {
    return axios.put(`${apiUrl}/messages/update/${messageId}`, payload);
  },
};
export default messagesService;
