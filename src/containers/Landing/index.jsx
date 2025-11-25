import React, { useRef, useEffect, useState } from "react";
import { headerItems } from "./landing.config";
import { useNavigate } from "react-router-dom";
/* Containers */
import BannerContainer from "./Banner";
import ServicesContainer from "./Services";
import LocationContainer from "./Location";
import GalleryContainer from "./Gallery";
/* Components */
import { Layout, Menu } from "antd";
/* Style */
import AgendaContainer from "./Agenda";
import ContactContainer from "./Contact";
import GlaringText from "../../components/Common/GlaringText";

const { Header, Footer, Content } = Layout;

function LandingContainer() {
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  const servicesRef = useRef(null);
  const appointmentRef = useRef(null);
  const locationRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showNavbar = scrollY > 300;
      setShowNavbar(showNavbar);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout className="landing-container">
      <Header
        className={` px-4 ${showNavbar ? "sticky-navbar" : "ghost-navbar"
          } bg-[#242424]`}
      >
        <Menu
          style={{ backgroundColor: "#242424" }}
          theme="dark"
          mode="horizontal"
          items={headerItems}
          defaultSelectedKeys={["home"]}
          onClick={(item) => {
            if (item.key === "home") {
              bannerRef.current?.scrollIntoView({ behavior: "smooth" });
            }
            if (item.key === "services") {
              servicesRef.current?.scrollIntoView({ behavior: "smooth" });
            }
            if (item.key === "contact") {
              contactRef.current?.scrollIntoView({ behavior: "smooth" });
            }
            if (item.key === "appointment") {
              navigate("/appointment");
            }
          }}
        />
      </Header>
      <Content>
        <GlaringText text={"Compre su SOAT con nosotros"} />{" "}
        <BannerContainer
          bannerRef={bannerRef}
          appointmentRef={appointmentRef}
        />
        <ServicesContainer servicesRef={servicesRef} />
        <AgendaContainer appointmentRef={appointmentRef} />
        <LocationContainer locationRef={locationRef} />
        <GalleryContainer galleryRef={galleryRef} />
        <ContactContainer contactRef={contactRef} />
      </Content>
      <Footer
        style={{ textAlign: "center", background: "#242424", color: "white" }}
      >
        Autoexpress© 2024. All rights reserved
      </Footer>
    </Layout>
  );
}
export default LandingContainer;
