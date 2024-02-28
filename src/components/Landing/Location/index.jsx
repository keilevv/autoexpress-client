import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { googleApiKey } from "../../../helpers/constants";
import useViewport from "../../../hooks/useViewport";

import "./style.css";

const libraries = ["places"];

const center = {
  lat: 10.382717485084571, // default latitude
  lng: -75.46860158443451, // default longitude
};
function Location() {
  const { isMobileScreen } = useViewport();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const mapContainerStyle = {
    height: isMobileScreen ? "300px" : "500px",
    width: isMobileScreen ? "300px" : "500px",
  };

  return (
    <div className="location-map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={19}
        center={center}
      >
        <MarkerF position={center} visible={true} />
      </GoogleMap>
    </div>
  );
}
export default Location;
