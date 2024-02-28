import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import clientsService from "../services/clients";
import { throwError } from "../helpers";

function useClient() {
  const auth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (auth.user && auth.user.accessToken) {
      setToken(auth.user.accessToken);
    }
  }, [auth]);

  const getClients = useCallback(() => {
    setLoading(true);
    return clientsService
      .getClients(token)
      .then((response) => {
        setClients(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error", err);
        setLoading(false);
      });
  }, []);

  const createClient = useCallback((payload) => {
    setLoading(true);
    return clientsService
      .createClient(payload)
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        // Extract relevant information from the error response
        throwError(err.message.message);
      });
  }, []);

  return { getClients, createClient, clients, loading };
}

export default useClient;
