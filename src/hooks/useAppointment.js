import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import appointmentsService from "../services/appointments";

function useAppointment() {
  const auth = useSelector((state) => state.auth);
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [count, setCount] = useState(0);

  const getAppointments = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    appointmentsService
      .getAppointmentList(auth.user.accessToken, page, limit, filter)
      .then((response) => {
        setLoading(false);
        setAppointments(response.data.results);
        setCount(response.data.count);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

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
    getAppointments,
    appointments,
    unavailableTimes,
    appointment,
    loading,
    count,
  };
}

export default useAppointment;
