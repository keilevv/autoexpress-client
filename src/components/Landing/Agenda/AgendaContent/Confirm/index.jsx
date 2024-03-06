import { Result } from "antd";
import "./style.css";
/**
 * @param {{ setForm: () => void, appointment: any }} props
 */
function AppointmentConfirm({ setForm, appointment }) {
  console.log("appointment", appointment);
  return (
    <div className="appointment-confirm-content">
      <Result
        status={"success"}
        title="Cita creada!"
        subTitle={`Dia: ${appointment.date} - Hora: ${appointment.time}`}
        className="appointment-confirm-result"
      />
      <p className="appointment-confirm-description">
        {`Se le enviará un correo con la confirmación a ${appointment.client.email}, por favor asegurarse de
        revisar su bandeja de entrada y spam.`}
      </p>
    </div>
  );
}
export default AppointmentConfirm;
