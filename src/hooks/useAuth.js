import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/reducers/authSlice";
import { throwError } from "../helpers/index";
import userService from "../services/user";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getUser = useCallback((userId) => {
    setLoading(true);
    return userService
      .getUser(auth.user.accessToken, userId)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        navigate("/login");
      });
  }, [auth]);

  const loginUser = useCallback((username, password) => {
    setLoading(true);
    return userService
      .login({ username, password })
      .then((response) => {
        setUser(response.data);
        dispatch(login(response.data));
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
  return { user, loading, loginUser, logoutUser, getUser };
}
export default useAuth;
