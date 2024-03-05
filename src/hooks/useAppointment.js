import { useState, useCallback } from "react";
import appointmentsService from "../services/appointments";

function useAppointment() {
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUnavailableTimesOfDay = useCallback((date) => {
    setLoading(true);
    return appointmentsService
      .getUnavailableTimes({ date })
      .then((response) => {
        setUnavailableTimes(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setUnavailableTimes(null);
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  return { getUnavailableTimesOfDay, unavailableTimes, loading };
}

export default useAppointment;
