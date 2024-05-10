import Banner from "../../../components/Landing/Banner";
import "./style.css";
/**
 * @param {{ bannerRef: any, appointmentRef: any }} props
 */
function BannerContainer({ bannerRef, appointmentRef }) {
  return (
    <section key="banner" ref={bannerRef}>
      <div className="banner-container">
        <Banner appointmentRef={appointmentRef} />
      </div>
    </section>
  );
}

export default BannerContainer;
