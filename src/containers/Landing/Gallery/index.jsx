import Gallery from "../../../components/Landing/Gallery";
import "./style.css";
/**
 * @param {{ galleryRef: any }} props
 */
function GalleryContainer({ galleryRef }) {
  return (
    <section key="gallery" ref={galleryRef}>
      <div className="gallery-container">
        <div className="gallery-text-container">
          <h1 className="gallery-title">
            Donde hacemos cada día mejor... lo que ya hacíamos bien.
          </h1>
        </div>
        <Gallery />
      </div>
    </section>
  );
}
export default GalleryContainer;
