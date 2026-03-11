import axios from "axios";

import { apiUrl } from "../helpers/constants";

const getDashboardData = (token, owner) => {
    return axios.get(`${apiUrl}/dashboard${owner ? `?owner=${owner}` : ""}`, {
        headers: {
            Authorization: `${token}`,
        },
    });
};

export default {
    getDashboardData,
};
