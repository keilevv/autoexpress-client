import { useState, useEffect } from "react";
import {
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
  DollarOutlined,
  ProjectOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Card, Button } from "antd";
import StatusLabel from "../StatusLabel";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { formatToCurrency } from "../../../../helpers";
import "./style.css";

function JobCard({ jobOrder }) {
  const navigate = useNavigate();
  const [consumedMaterials, setConsumedMaterials] = useState([]);
  const [consumedColors, setConsumedColors] = useState([]);

  function getJobOrderPrice() {
    let materialsPrice = consumedMaterials
      .map((item) => item?.storage_material?.price * item?.quantity)
      .reduce((a, b) => a + b, 0);
    let colorsPrice = consumedColors
      .map((item) => item?.price)
      .reduce((a, b) => a + b, 0);
    materialsPrice = isNaN(materialsPrice) ? 0 : materialsPrice;
    colorsPrice = isNaN(colorsPrice) ? 0 : colorsPrice;
    return formatToCurrency(materialsPrice + colorsPrice);
  }

  useEffect(() => {
    if (jobOrder?.consumed_materials?.length > 0) {
      setConsumedMaterials(
        jobOrder.consumed_materials.map((item) => {
          return {
            consumption_material: item.consumption_material,
            quantity: item.quantity,
            storage_material: item.storage_material,
          };
        })
      );
    }
    if (jobOrder?.consumed_colors?.length > 0) {
      setConsumedColors(jobOrder.consumed_colors);
    }
  }, [jobOrder]);

  return (
    <Card
      title={
        <div className="flex gap-4">
          <FileOutlined className="text-xl" />
          <p className="text-xl font-semibold"> O.T. {jobOrder.number}</p>
        </div>
      }
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
          <div className="flex gap-4 items-start">
            <FormOutlined className="text-base mt-1" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">Description</p>
              <p className="text-base  text-gray-700">
                {jobOrder?.description
                  ? jobOrder?.description
                  : "Sin descripción"}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <CalendarOutlined className="text-base mt-1 mt-1" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">
                Fecha de entrega
              </p>
              <p className="text-base mt-1 text-gray-700">
                {dayjs(jobOrder.date).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <UserOutlined className="text-base mt-1" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">Trabajador</p>
              <p className="text-base mt-1 text-gray-700">
                {jobOrder.employee.name}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <CarOutlined className="text-base mt-1" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">Placa</p>

              <p className="text-base mt-1 text-gray-700">
                {jobOrder.car_plate.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <CarOutlined className="text-base mt-1" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">Marca</p>

              <p className="text-base mt-1 text-gray-700">
                {jobOrder?.car_brand
                  ? jobOrder.car_brand.toUpperCase()
                  : "Sin definir"}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <CarOutlined className="text-base mt-1" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">Modelo</p>

              <p className="text-base mt-1 text-gray-700">
                {jobOrder?.car_model
                  ? jobOrder.car_model.toUpperCase()
                  : "Sin definir"}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <DollarOutlined className="text-base mt-1" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">Costo</p>
              <p className="ml-auto text- font-medium">
                {getJobOrderPrice()}
              </p>{" "}
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <ProjectOutlined className="text-base mt-1" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">Situación</p>
              <StatusLabel status={jobOrder?.status[0]} isJobCard={true} />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-4">
          <Button
            className="text-base mt-1 font-semibold  hover:underline cursor-pointer"
            onClick={() => {
              navigate(`/operations/production/jobs/${jobOrder._id}`);
            }}
          >
            Ver detalles
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default JobCard;
