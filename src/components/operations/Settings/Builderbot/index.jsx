import useBuilderbot from "../../../../hooks/useBuilderbot";
import { useEffect } from "react";
function BuilderBotSettings() {
  const { getSession, loading } = useBuilderbot();

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <div>
      <h1>BuilderBot</h1>
      {loading && <p>Cargando...</p>}
    </div>
  );
}
export default BuilderBotSettings;
