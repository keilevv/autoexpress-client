import "./style.css";
function DashboardGrid() {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-grid-item">
        <h2>Ingresos</h2>
        <h3>Esta semana</h3>
        <p>Clientes: </p>
        <p>Autos: </p>
        <p>Citas:</p>
      </div>
      <div className="dashboard-grid-item"></div>
      {/* <div className="dashboard-grid-item">
        <h2>Patio</h2>
      </div> */}
    </div>
  );
}

export default DashboardGrid;
