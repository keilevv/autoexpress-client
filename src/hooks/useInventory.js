import { useState, useEffect, useCallback } from "react";
import materialsService from "../services/inventory";
import { useSelector } from "react-redux";
import { throwError } from "../helpers";
function useInventory() {
  const [storageMaterial, setStorageMaterial] = useState({});
  const [storageMaterials, setStorageMaterials] = useState([]);
  const [consumptionMaterial, setConsumptionMaterial] = useState({});
  const [consumptionMaterials, setConsumptionMaterials] = useState([]);
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

  function createConsumptionMaterial(payload) {
    setLoading(true);
    return materialsService
      .createConsumptionMaterial(auth.user.accessToken, payload)
      .then((response) => {
        setConsumptionMaterials([...storageMaterials, response.data]);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }

  const getConsumptionMaterials = useCallback(
    (page = 1, limit = 10, filter = "") => {
      setLoading(true);
      return materialsService
        .getConsumptionMaterials(auth.user.accessToken, page, limit, filter)
        .then((response) => {
          setMaterials(response.data.results);
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

  const getConsumptionMaterial = useCallback((materialId) => {
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

  const updateConsumptionMaterial = useCallback((materialId, payload) => {
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

  const deleteConsumptionMaterial = useCallback((marterialId) => {
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
    createConsumptionMaterial,
    getConsumptionMaterials,
    updateConsumptionMaterial,
    deleteConsumptionMaterial,
    getConsumptionMaterial,
    consumptionMaterial,
    consumptionMaterials,
    storageMaterial,
    storageMaterials,
    count,
    loading,
  };
}

export default useInventory;
