import Agenda from "../../../components/Landing/Agenda";
/* Style */
import "./style.css";
/**
 * @param {{ agendaRef: any }} props
 */
function AgendaContainer({ agendaRef }) {
  return (
    <section key="agenda" ref={agendaRef}>
      <div className="agenda-banner-container">
        <i className="fa-solid fa-calendar-days agenda-logo"></i>
        <h1 className="agenda-banner-title">Agende una cita.</h1>
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
