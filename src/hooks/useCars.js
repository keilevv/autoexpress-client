import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import carsService from "../services/cars";
import { throwError } from "../helpers";

function useCars() {
  const auth = useSelector((state) => state.auth);
  const [cars, setCars] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [count, setCount] = useState(0);

  const getCars = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    carsService
      .getCarsList(auth.user.accessToken, page, limit, filter)
      .then((response) => {
        setLoading(false);
        setCount(response.data.count);
        setCars(response.data.results);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const getCar = useCallback((carId) => {
    setLoading(true);
    carsService
      .getCar(auth.user.accessToken, carId)
      .then((response) => {
        setLoading(false);
        setCar(response.data.results);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  function getCarListByPlate(plateValue) {
    setLoading(true);
    carsService
      .getCarListByPlate(auth.user.accessToken, plateValue)
      .then((response) => {
        setLoading(false);
        setCars(response.data.results);
      })
      .catch((err) => {
        setLoading(false);
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
        setLoading(false);
        throwError(err.response.data.message);
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

  const updateCar = useCallback((carId, payload) => {
    setLoading(true);
    return carsService
      .updateCar(carId, payload)
      .then((response) => {
        setCar(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
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
    count,
    getCar,
    getCars,
    getCarsApi,
    createCar,
    getCarByPlate,
    updateCar,
    getCarListByPlate,
  };
}

export default useCars;
