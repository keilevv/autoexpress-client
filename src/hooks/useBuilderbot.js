import { useCallback, useState } from "react";
import builderbotService from "../services/builderbot";
import { useSelector } from "react-redux";

function useBuilderbot() {
  const auth = useSelector((state) => state.auth);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSession = useCallback(() => {
    setLoading(true);
    builderbotService.getSession(auth.accessToken).then((response) => {
      console.log("response", response);
      setLoading(false);
      return response.data.results;
    });
  }, [auth.accessToken]);

  return {
    getSession,
  };
}
export default useBuilderbot;
