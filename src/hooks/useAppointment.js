import { useState, useCallback } from "react";
import appointmentsService from "../services/appointments";

function useAppointment() {
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);

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

  const createAppointment = useCallback(
    (payload) => {
      setLoading(true);
      return appointmentsService
        .createAppointment(payload)
        .then((response) => {
          setLoading(false);
          setAppointment(response.data.results);
          return response;
        })
        .catch((err) => {
          setAppointment(null);
          setLoading(false);
          throwError(err.response.data.message);
        });
    },
    [setLoading]
  );

  return {
    getUnavailableTimesOfDay,
    createAppointment,
    unavailableTimes,
    appointment,
    loading,
  };
}

export default useAppointment;
