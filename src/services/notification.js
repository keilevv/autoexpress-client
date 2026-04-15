import axios from "axios";
import { apiUrl } from "../helpers/constants";

const notificationService = {
  getNotifications(token, page = 1, limit = 10) {
    return axios.get(`${apiUrl}/notifications/?page=${page}&limit=${limit}`, {
      headers: { Authorization: `${token}` },
    });
  },

  deleteNotification(token, notificationId) {
    return axios.delete(`${apiUrl}/notifications/${notificationId}`, {
      headers: { Authorization: `${token}` },
    });
  },

  markAllAsRead(token) {
    return axios.put(`${apiUrl}/notifications/read-all`, {}, {
      headers: { Authorization: `${token}` },
    });
  },
};

export default notificationService;
