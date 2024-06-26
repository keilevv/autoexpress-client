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
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (auth.user && auth.user.accessToken) {
      setToken(auth.user.accessToken);
    }
  }, [auth]);

  const getClients = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    return clientsService
      .getClients(auth.user.accessToken, page, limit, filter)
      .then((response) => {
        setCount(response.data.count);
        setClients(response.data.results);

        setLoading(false);
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }, []);

  const getClient = useCallback((clientId) => {
    setLoading(true);
    clientsService
      .getClient(auth.user.accessToken, clientId)
      .then((response) => {
        setLoading(false);
        setClient(response.data.results);
      })
      .catch((err) => {
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
        throwError(err.response.data.error);
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

  function getClientListByName(nameValue) {
    setLoading(true);
    clientsService
      .getClientListByName(token, nameValue)
      .then((response) => {
        setLoading(false);
        setClients(response.data.results);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

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
    getClientListByName,
    getClient,
    client,
    clients,
    loading,
    count,
  };
}

export default useClient;
