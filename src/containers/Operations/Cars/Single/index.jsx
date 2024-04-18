import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
/* Hooks*/
import useCars from "../../../../hooks/useCars";
/* Components */
import { useSelector } from "react-redux";
import CarForm from "../../../../components/Landing/Agenda/AgendaContent/Car";
import { Skeleton, Breadcrumb } from "antd";

import "./style.css";

function SingleCarContainer() {
  const navitate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [carId, setCarId] = useState("");
  const [form, setForm] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { car, getCar, loading } = useCars();

  useEffect(() => {
    if (carId) {
      getCar(carId);
    }
  }, [carId, user]);

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "cars") {
        setCarId(window.location.pathname.split("/")[index + 1]);
      }
    });
  }, [window.location.pathname]);

  return (
    <div className="single-car-container">
      {loading || !car ? (
        <Skeleton />
      ) : (
        <div className="single-car-content">
          <h1 className="single-car-title">Detalles del vehículo</h1>
          <Breadcrumb
            items={[
              {
                title: (
                  <a onClick={() => navitate("/operations")}>Operaciones</a>
                ),
              },
              {
                title: (
                  <a onClick={() => navitate("/operations/cars")}>Autos</a>
                ),
              },
              { title: car?.plate },
            ]}
          />
          <div className="car-form">
            <CarForm
              isEditing={isEditing}
              car={car}
              setForm={setForm}
              showFullForm={true}
              isCarDetails={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default SingleCarContainer;
