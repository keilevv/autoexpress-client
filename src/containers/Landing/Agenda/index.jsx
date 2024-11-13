import Agenda from "../../../components/Landing/Agenda";
/* Style */
import "./style.css";
/**
 * @param {{ appointmentRef: any }} props
 */
function AgendaContainer({ appointmentRef }) {
  return (
    <section key="appointment" ref={appointmentRef} className="bg-red-700">
      <div className="agenda-banner-container">
        <i className="fa-solid fa-calendar-days agenda-logo"></i>
        <h1 className="text-4xl text-white font-semibold my-4">Agende una cita.</h1>
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
