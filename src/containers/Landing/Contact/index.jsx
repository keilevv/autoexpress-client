import ContactForm from "../../../components/Landing/Contact/ContactForm";
import ClassicCarCss from "../../../components/Common/ClassicCarCss";
import "./style.css";
/**
 * @param {{ contactRef: any }} props
 */
function ContactContainer({ contactRef }) {
  return (
    <section key="contact" ref={contactRef}>
      <div className="contact-container">
        <div className="contact-text-container">
          <h1 className="contact-title-header" style={{ marginBottom: "45px" }}>
            ¿Tiene una inquietud?
          </h1>
          <h1 className="contact-title">
            Entendemos que puede tener preguntas o inquietudes. Estamos aquí
            para responder a todas sus dudas, explicar el proceso y brindarle la
            información que necesita para sentirse tranquilo durante la
            reparación de su vehículo.
          </h1>
        </div>
        <div className="contact-content">
          <div className="classic-car-icon">
            <ClassicCarCss />
          </div>
          <div className="contact-form-container">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactContainer;
