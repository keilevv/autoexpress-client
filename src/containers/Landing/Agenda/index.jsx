import Agenda from "../../../components/Landing/Agenda";
import background from "../../../assets/images/carousel/detailing-1-min.jpg";
/* Style */
import "./style.css";
/**
 * @param {{ appointmentRef: any }} props
 */
function AgendaContainer({ appointmentRef }) {
  return (
    <section
      key="appointment"
      ref={appointmentRef}
      className="relative bg-fixed bg-center bg-cover py-20"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      <div className="agenda-banner-container relative z-10">
        <i className="fa-solid fa-calendar-days agenda-logo"></i>
        <h1 className="text-4xl text-white font-semibold my-4">
          Agende una cita.
        </h1>
        <h1 className="agenda-banner-title-description">
          Para su comodidad, ahora puede agendar una cita directamente con
          nosotros.
        </h1>
        <Agenda />
      </div>
    </section>
  );
}

export default AgendaContainer;
