import axios from "axios";
import { apiUrl } from "../helpers/constants";

const carsService = {
  get(token, page, limit, filter) {
    return axios.get(
      `${apiUrl}/cars/operations?page=${page}&limit=${limit}&filter=${filter}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
  },
  getCarBrandsWithApi(brandName) {
    return axios.get(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?${
        brandName.length ? ` where="${brandName}"` : ""
      }&group_by=make&limit=20`
    );
  },
  getCarModelsWithApi(modelName, brandName) {
    return axios.get(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?where=make="${brandName}" ${
        modelName.length ? `and "${modelName}"` : ""
      }&group_by=model&limit=20`
    );
  },
  createCar(payload) {
    return axios.post(`${apiUrl}/cars/register`, payload);
  },
  getCarByPlate(carPlate, clientId) {
    return axios.post(`${apiUrl}/cars/plate/${carPlate}`, {
      client_id: clientId,
    });
  },
  getCarListByPlate(token, carPlate) {
    return axios.get(`${apiUrl}/cars/operations/plate/${carPlate}`, {
      headers: { Authorization: `${token}` },
    });
  },
  updateCar(carId, payload) {
    return axios.put(`${apiUrl}/cars/update/${carId}`, payload);
  },
};
export default carsService;
