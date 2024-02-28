import Banner from "../../../components/Landing/Banner";
import "./style.css";
/**
 * @param {{ bannerRef: any, agendaRef: any }} props
 */
function BannerContainer({ bannerRef, agendaRef }) {
  return (
    <section key="banner" ref={bannerRef}>
      <div className="banner-container">
        <Banner agendaRef={agendaRef} />
      </div>
    </section>
  );
}

export default BannerContainer;
