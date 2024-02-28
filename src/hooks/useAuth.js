import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/reducers/authSlice"
import userService from "../services/user";

function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});


  const loginUser = useCallback((username, password) => {
    setLoading(true);
    return userService.login({ username, password })
      .then((response) => {
        setUser(response.data);
        dispatch(login(response.data))
        setLoading(false);
        return response
      })
  }, [])

  function logoutUser() {
    setUser(null);
    dispatch(logout())
  }
  return { user, loading, loginUser, logoutUser }
}
export default useAuth