import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import Logo from "../assets/images/autoexpresslogo.png";
import LoginLayout from "../containers/Login";

const ProtectedRoute = ({ children }) => {
  const [isValidSession, setIsValidSession] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const { getUser } = useAuth();

  console.log("isValidSession", isValidSession);

  useEffect(() => {
    if (user) {
      getUser(user.id ? user.id : "invalid-user-id")
        .then((response) => {
          if (response.data.results) {
            setIsValidSession(true);
            setLoading(false);
          }
        })
        .catch((err) => {
          setIsValidSession(false);
          setLoading(false);
        });
    } else {
      setIsValidSession(false);
      setLoading(false);
    }
  }, [user]);

  if (loading)
    return (
      <div className="w-full flex justify-center items-center h-screen flex-col text-blue-800 font-bold ">
        <h1 className="italic leading-none text-gray-500">M&L</h1>
        <h1 className="italic leading-none">Autocheck</h1>
      </div>
    );
  if (!isValidSession) return <LoginLayout />;

  return <>{children}</>;
};

export default ProtectedRoute;
