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

  const getAppointment = useCallback((carId) => {
    setLoading(true);
    appointmentsService
      .getAppointment(auth.user.accessToken, carId)
      .then((response) => {
        setLoading(false);
        setAppointment(response.data.results);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

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

  const updateAppointment = useCallback((appointmentId, payload) => {
    setLoading(true);
    return appointmentsService
      .updateAppointment(auth.user.accessToken, appointmentId, payload)
      .then((response) => {
        setAppointment(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  return {
    getUnavailableTimesOfDay,
    createAppointment,
    getAppointments,
    updateAppointment,
    getAppointment,
    appointments,
    unavailableTimes,
    appointment,
    loading,
    count,
  };
}

export default useAppointment;
