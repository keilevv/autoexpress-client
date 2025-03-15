import { useState, useEffect, useCallback } from "react";
import inventoryService from "../services/inventory";
import { useSelector } from "react-redux";
import { throwError } from "../helpers";
function useInventory() {
  const [storageMaterial, setStorageMaterial] = useState({});
  const [storageMaterials, setStorageMaterials] = useState([]);
  const [consumptionMaterial, setConsumptionMaterial] = useState({});
  const [consumptionMaterials, setConsumptionMaterials] = useState([]);
  const [sale, setSale] = useState({});
  const [sales, setSales] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const auth = useSelector((state) => state.auth);
  const [totalPriceStorage, setTotalPriceStorage] = useState(0);
  const [totalPriceConsumption, setTotalPriceConsumption] = useState(0);

  useEffect(() => {
    if (auth.user && auth.user.accessToken) {
      setToken(auth.user.accessToken);
    }
  }, [auth]);

  const createStorageMaterial = useCallback((payload) => {
    setLoading(true);
    return inventoryService
      .createStorageMaterial(auth.user.accessToken, payload)
      .then((response) => {
        setStorageMaterials([...storageMaterials, response.data]);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
        return err;
      });
  }, []);

  const restockStorageMaterials = useCallback((payload) => {
    setLoading(true);
    return inventoryService
      .restockStorageMaterials(auth.user.accessToken, payload)
      .then((response) => {
        if (response.data) {
          setLoading(false);
          return response;
        }
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  const getStorageMaterials = useCallback(
    (page = 1, limit = 10, filter = "") => {
      setLoading(true);
      return inventoryService
        .getStorageMaterials(auth.user.accessToken, page, limit, filter)
        .then((response) => {
          setTotalPriceStorage(response.data.total_price);
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
    return inventoryService
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
    return inventoryService
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
    return inventoryService
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
    return inventoryService
      .createConsumptionMaterial(auth.user.accessToken, payload)
      .then((response) => {
        setConsumptionMaterials([...storageMaterials, response.data]);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
      });
  }

  const getConsumptionMaterials = useCallback(
    (page = 1, limit = 10, filter = "") => {
      setLoading(true);
      return inventoryService
        .getConsumptionMaterials(auth.user.accessToken, page, limit, filter)
        .then((response) => {
          setTotalPriceConsumption(response.data.total_price);
          setConsumptionMaterials(response.data.results);
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
    return inventoryService
      .getConsumptionMaterial(auth.user.accessToken, materialId)
      .then((response) => {
        setConsumptionMaterial(response.data.results);
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
    return inventoryService
      .updateConsumptionMaterial(auth.user.accessToken, materialId, payload)
      .then((response) => {
        if (response.data) {
          setConsumptionMaterial(response.data);
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
    return inventoryService
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

  const createSale = useCallback((payload) => {
    setLoading(true);
    return inventoryService
      .createSale(auth.user.accessToken, payload)
      .then((response) => {
        setSales([...sales, response.data]);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
        return err;
      });
  }, []);

  const getSales = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    return inventoryService
      .getSales(auth.user.accessToken, page, limit, filter)
      .then((response) => {
        setSales(response.data.results);
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

  const getSale = useCallback((materialId) => {
    setLoading(true);
    return inventoryService
      .getSale(auth.user.accessToken, materialId)
      .then((response) => {
        setSale(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
        return err;
      });
  }, []);

  const updateSale = useCallback((materialId, payload) => {
    setLoading(true);
    return inventoryService
      .updateSale(auth.user.accessToken, materialId, payload)
      .then((response) => {
        if (response.data) {
          setSale(response.data);
          setLoading(false);
          return response;
        }
      })
      .catch((err) => {
        throwError(err.response.data.message);
      });
  }, []);

  const deleteSale = useCallback((marterialId) => {
    setLoading(true);
    return inventoryService
      .deleteSale(auth.user.accessToken, marterialId)
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
    createSale,
    getSales,
    getSale,
    updateSale,
    deleteSale,
    restockStorageMaterials,
    consumptionMaterial,
    consumptionMaterials,
    storageMaterial,
    storageMaterials,
    sales,
    sale,
    count,
    loading,
    totalPriceConsumption,
    totalPriceStorage,
  };
}

export default useInventory;
