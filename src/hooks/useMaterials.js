import { useState, useEffect, useCallback } from "react";
import materialsService from "../services/materials";
import { useSelector } from "react-redux";
import { throwError } from "../helpers";
function useMaterials() {
  const [storageMaterial, setStorageMaterial] = useState({});
  const [storageMaterials, setStorageMaterials] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user && auth.user.accessToken) {
      setToken(auth.user.accessToken);
    }
  }, [auth]);

  function createStorageMaterial(payload) {
    setLoading(true);
    return materialsService
      .createStorageMaterial(auth.user.accessToken, payload)
      .then((response) => {
        setStorageMaterials([...storageMaterials, response.data]);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }

  const getStorageMaterials = useCallback(
    (page = 1, limit = 10, filter = "") => {
      setLoading(true);
      return materialsService
        .getStorageMaterials(auth.user.accessToken, page, limit, filter)
        .then((response) => {
          setStorageMaterials(response.data.results);
          setCount(response.data.count);
          setLoading(false);
          return response;
        })
        .catch((err) => {
          setLoading(false);
          throwError(err.message.message);
          return err;
        });
    },
    []
  );

  const getStorageMaterial = useCallback((materialId) => {
    setLoading(true);
    return materialsService
      .getStorageMaterial(auth.user.accessToken, materialId)
      .then((response) => {
        setStorageMaterial(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
        return err;
      });
  }, []);

  const updateStorageMaterial = useCallback((materialId, payload) => {
    setLoading(true);
    return materialsService
      .updateStorageMaterial(auth.user.accessToken, materialId, payload)
      .then((response) => {
        if (response.data) {
          setStorageMaterial(response.data);
          setLoading(false);
          return response;
        }
      })
      .catch((err) => {
        throwError(err.response.data.message);
      });
  }, []);

  const deleteStorageMaterial = useCallback((marterialId) => {
    setLoading(true);
    return materialsService
      .deleteStorageMaterial(auth.user.accessToken, marterialId)
      .then((response) => {
        if (response.data) {
          setLoading(false);
          return response;
        }
      })
      .catch((err) => {
        throwError(err.response.data.message);
      });
  }, []);

  return {
    createStorageMaterial,
    getStorageMaterials,
    updateStorageMaterial,
    deleteStorageMaterial,
    getStorageMaterial,
    storageMaterial,
    storageMaterials,
    count,
    loading,
  };
}

export default useMaterials;
