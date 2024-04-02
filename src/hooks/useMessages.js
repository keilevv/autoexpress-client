import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import messagesService from "../services/messages";
import { throwError } from "../helpers";

function useMessages() {
  const auth = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const getMessages = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    messagesService
      .getMessagesList(auth.user.accessToken, page, limit, filter)
      .then((response) => {
        setMessages(response.data.results);
        setCount(response.data.count);
        setLoading(false);
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }, []);

  const createMessage = useCallback((payload) => {
    setLoading(true);
    return messagesService
      .createMessage(payload)
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }, []);
  return { messages, getMessages, createMessage, count, loading };
}

export default useMessages;
