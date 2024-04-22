import React from "react";
import Painting from "../../../assets/images/carousel/painting-1-min.jpg";
import ColorTeam from "../../../assets/images/carousel/color-team-1-min.jpg";
import PaintCabin2 from "../../../assets/images/carousel/paint-cabin-2-min.jpg";
import PaintCabin from "../../../assets/images/carousel/paint-cabin-1-min.jpg";
import Entrance from "../../../assets/images/carousel/entrance-1-min.jpg";
import BodyWork from "../../../assets/images/carousel/bodywork-1-min.jpg";
import LazyLoad from "react-lazy-load";

import "./style.css";

function Gallery() {
  return (
    <div>
      <div className="carousel-container">
        <LazyLoad className="gallery-image" onContentVisible={() => {}}>
          <img className="gallery-image" src={Entrance} />
        </LazyLoad>
        <LazyLoad className="gallery-image">
          <img className="gallery-image" src={ColorTeam} />
        </LazyLoad>
        <LazyLoad className="gallery-image">
          <img className="gallery-image" src={PaintCabin2} />
        </LazyLoad>
      </div>
      <div className="carousel-container extra-row">
        <LazyLoad className="gallery-image">
          <img className="gallery-image" src={PaintCabin} />
        </LazyLoad>
        <LazyLoad className="gallery-image">
          <img className="gallery-image" src={Painting} />
        </LazyLoad>
        <LazyLoad className="gallery-image">
          <img className="gallery-image" src={BodyWork} />
        </LazyLoad>
      </div>
    </div>
  );
}
export default Gallery;
