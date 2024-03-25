import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import appointmentsService from "../services/appointments";

function useAppointment() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.user.accessToken);
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);

  console.log("authAppointment", auth);

  function getAppointments() {
    setLoading(true);
    appointmentsService
      .getAppointmentList(token)
      .then((response) => {
        setLoading(false);
        setAppointments(response.data.results);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

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
  };
}

export default useAppointment;
