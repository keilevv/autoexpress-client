import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import messagesService from "../services/messages";
import { throwError } from "../helpers";

function useMessages() {
  const auth = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const getMessages = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    return messagesService
      .getMessagesList(auth.user.accessToken, page, limit, filter)
      .then((response) => {
        setMessages(response.data.results);
        setCount(response.data.count);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.message.message);
        return err;
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
        setLoading(false);
        throwError(err.message.message);
      });
  }, []);

  const updateMessage = useCallback((messageId, payload) => {
    setLoading(true);
    return messagesService
      .updateMessage(messageId, payload)
      .then((response) => {
        setMessage(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  return {
    messages,
    message,
    getMessages,
    createMessage,
    updateMessage,
    count,
    loading,
  };
}

export default useMessages;
