import { useCallback, useState } from "react";
import builderbotService from "../services/builderbot";

function useBuilderbot() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSession = useCallback(() => {
    setLoading(true);
    builderbotService.getSession().then((response) => {
      console.log("response", response);
      setLoading(false);
      return response.data.results;
    });
  }, []);

  return {
    getSession,
  };
}
export default useBuilderbot;
