import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import clientsService from "../services/clients";
import { throwError } from "../helpers";

function useClient() {
  const auth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);

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
        throwError(err.message.message);
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
        throwError(err.response.data.message);
      });
  }, []);

  const getClientByCountryId = useCallback((countryId) => {
    setLoading(true);
    return clientsService
      .getClientByCountryId(countryId)
      .then((response) => {
        setClient(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setClient(null);
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  const updateClient = useCallback((clientId, payload) => {
    setLoading(true);
    return clientsService
      .updateClient(clientId, payload)
      .then((response) => {
        setClient(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  return {
    getClients,
    createClient,
    getClientByCountryId,
    updateClient,
    client,
    clients,
    loading,
  };
}

export default useClient;
