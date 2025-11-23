import Banner from "../../../components/Landing/Banner";

/**
 * @param {{ bannerRef: any, appointmentRef: any }} props
 */
function BannerContainer({ bannerRef, appointmentRef }) {
  return (
    <section key="banner" ref={bannerRef}>
      <Banner appointmentRef={appointmentRef} />
    </section>
  );
}

export default BannerContainer;
