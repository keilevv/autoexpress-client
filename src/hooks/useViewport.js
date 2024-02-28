import React from "react";

function useViewport() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const breakpointMobile = 900;

  const isMobileScreen = width < breakpointMobile;
  return { isMobileScreen };
}
export default useViewport;
