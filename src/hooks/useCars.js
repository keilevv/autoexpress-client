import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import carsService from "../services/cars";
import { throwError } from "../helpers";

function useCars() {
  const auth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [cars, setCars] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (auth.user && auth.user.acessToken) {
      setToken(auth.user.accessToken);
    }
  }, [auth]);

  function getCars() {
    carsService
      .get(token)
      .then((response) => {
        setCars(response.data.results);
      })
      .catch((err) => {
        console.log("error", error);
      });
  }

  const createCar = useCallback((payload) => {
    setLoading(true);
    return carsService
      .createCar(payload)
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        // Extract relevant information from the error response
        throwError(err);
      });
  }, []);

  function getCarsApi(value = "", brand = "") {
    setLoading(true);
    if (brand) {
      carsService
        .getCarModelsWithApi(value, brand)
        .then((response) => {
          if (response.data.results) {
            setCarModels(
              response.data.results.map((item) => {
                return { value: item.model, label: item.model };
              })
            );
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      carsService
        .getCarBrandsWithApi(value)
        .then((response) => {
          if (response.data.results) {
            setCarBrands(
              response.data.results.map((item) => {
                return { value: item.make, label: item.make };
              })
            );
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }

  const getCarByPlate = useCallback((countryId, clientId) => {
    setLoading(true);
    return carsService
      .getCarByPlate(countryId, clientId)
      .then((response) => {
        setCar(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setCar(null);
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  return {
    cars,
    car,
    carBrands,
    loading,
    carModels,
    getCars,
    getCarsApi,
    createCar,
    getCarByPlate,
  };
}

export default useCars;
