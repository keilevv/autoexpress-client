import "./style.css";
/**
 * @param {{ setForm: () => void }} props
 */
function AppointmentConfirm({ setForm }) {
  return (
    <div className="appointment-confirm-content">
      <h1 className="appointment-confirm-title">Su cita ha sido creada!</h1>
      <h2 className="appointment-confirm-subtitle">Dia:</h2>
      <h3 className="appointment-confirm-data">23-02-2024</h3>
      <div style={{ marginTop: "50px" }}>
        <h2 className="appointment-confirm-subtitle">Hora:</h2>
        <h3 className="appointment-confirm-data"> 10:20 a.m</h3>
      </div>
    </div>
  );
}
export default AppointmentConfirm;
