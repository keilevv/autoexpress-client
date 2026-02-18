import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  logout,
  setAccessToken,
  setUserData,
} from "../redux/reducers/authSlice";
import { throwError } from "../helpers/index";
import userService from "../services/user";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getUser = useCallback(
    (userId) => {
      setLoading(true);
      return userService
        .getAuth(auth.accessToken, userId)
        .then((response) => {
          setUser(response.data.user);
          setLoading(false);
          return response;
        })
        .catch((err) => {
          navigate("/login");
        });
    },
    [auth],
  );

  const loginUser = useCallback((username, password) => {
    setLoading(true);
    return userService
      .login({ username, password })
      .then((response) => {
        const { refreshToken, ...userData } = response.data;
        setUser(userData);
        dispatch(login(userData));
        setLoading(false);
        return response;
      })
      .catch((err) => {
        throwError(err.message.message);
      });
  }, []);

  function logoutUser() {
    setUser(null);
    dispatch(logout());
  }

  function updateUser(userId, payload) {
    setLoading(true);
    return userService
      .updateUser(auth.accessToken, userId, payload)
      .then((response) => {
        setUser(response.data.results);
        const user = response.data.results;
        user.id = response.data.results._id;
        dispatch(setUserData(response.data.results));
        setLoading(false);
        return response.data;
      })
      .catch((err) => {
        throwError(err.message.message);
      });
  }
  return { user, loading, loginUser, logoutUser, getUser, updateUser };
}
export default useAuth;
