import { useState, useEffect } from "react";
import { Card, Button, Badge, Tooltip } from "antd";
import {
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
  DollarOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  BgColorsOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import StatusLabel from "../StatusLabel";
import dayjs from "dayjs";
import { formatToCurrency } from "../../../../helpers";

export default function JobCard({ jobOrder }) {
  const [consumedMaterials, setConsumedMaterials] = useState([]);
  const [consumedColors, setConsumedColors] = useState([]);

  function getJobOrderPrice() {
    let materialsPrice = consumedMaterials
      .map(
        (item) => item?.consumption_material?.material?.price * item?.quantity
      )
      .reduce((a, b) => a + b, 0);
    let colorsPrice = consumedColors
      .map((item) => {
        console.log("item", item);
        return item?.price;
      })
      .reduce((a, b) => a + b, 0);

    console.log("colorsPrice", colorsPrice);
    materialsPrice = isNaN(materialsPrice) ? 0 : materialsPrice;
    colorsPrice = isNaN(colorsPrice) ? 0 : colorsPrice;
    return formatToCurrency(materialsPrice + colorsPrice);
  }

  const isOverdue =
    jobOrder?.due_date && dayjs(jobOrder.due_date).isBefore(dayjs(), "day");
  const isDueSoon =
    jobOrder?.due_date &&
    !isOverdue &&
    dayjs(jobOrder.due_date).diff(dayjs(), "day") <= 3;

  useEffect(() => {
    if (jobOrder?.consumed_materials?.length > 0) {
      setConsumedMaterials(
        jobOrder.consumed_materials.map((item) => ({
          consumption_material: item.consumption_material,
          quantity: item.quantity,
          storage_material: item.storage_material,
        }))
      );
    }
    if (jobOrder?.consumed_colors?.length > 0) {
      setConsumedColors(jobOrder.consumed_colors);
    }
  }, [jobOrder]);

  const handleViewDetails = () => {
    if (typeof window !== "undefined") {
      window.location.href = `/operations/production/jobs/${jobOrder._id}`;
    }
  };

  return (
    <Card
      className="w-full hover:shadow-lg transition-shadow duration-300 border border-gray-200"
      styles={{ body: { padding: "16px" } }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-2 rounded-lg">
            <FileOutlined className="text-gray-700 text-lg" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0">Orden de Trabajo</p>
            <span className="font-bold text-lg text-gray-800">
              #{jobOrder.number}
            </span>
          </div>
        </div>
        <StatusLabel status={jobOrder?.status[0]} isJobCard={true} />
      </div>

      {jobOrder?.description && (
        <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
          <p className="text-sm text-gray-700 mb-0 line-clamp-2">
            <i className="fa fa-file-text-o mr-2 text-gray-500" />
            {jobOrder?.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CalendarOutlined className="text-gray-600" />
            <span className="text-xs text-gray-600 font-medium">Creación</span>
          </div>
          <p className="text-sm font-bold text-gray-800 mb-0">
            {dayjs(jobOrder?.created_date).format("DD/MM/YYYY")}
          </p>
        </div>

        {jobOrder?.due_date && (
          <div
            className={`rounded-lg p-3 border ${
              isOverdue
                ? "bg-red-50 border-red-200"
                : isDueSoon
                ? "bg-orange-50 border-orange-200"
                : "bg-gray-50 border-gray-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <ClockCircleOutlined
                className={
                  isOverdue
                    ? "text-red-600"
                    : isDueSoon
                    ? "text-orange-600"
                    : "text-gray-600"
                }
              />
              <span className="text-xs text-gray-600 font-medium">
                Vencimiento
              </span>
            </div>
            <p
              className={`text-sm font-bold mb-0 ${
                isOverdue
                  ? "text-red-700"
                  : isDueSoon
                  ? "text-orange-700"
                  : "text-gray-800"
              }`}
            >
              {dayjs(jobOrder?.due_date).format("DD/MM/YYYY")}
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 p-2 rounded-full">
            <UserOutlined className="text-gray-700" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0">Asignado a</p>
            <span className="text-sm font-bold text-gray-800">
              {jobOrder.employee?.name}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-slate-700 p-2 rounded-lg">
            <CarOutlined className="text-white text-lg" />
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-0">Vehículo</p>
            <span className="text-lg font-bold text-slate-900">
              {jobOrder.car_plate.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded p-2 border border-slate-100">
            <p className="text-xs text-gray-500 mb-1">
              <i className="fa fa-tag mr-1" />
              Marca
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-0">
              {jobOrder?.car_brand
                ? jobOrder.car_brand.toUpperCase()
                : "Sin definir"}
            </p>
          </div>
          <div className="bg-white rounded p-2 border border-slate-100">
            <p className="text-xs text-gray-500 mb-1">
              <i className="fa fa-car mr-1" />
              Modelo
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-0">
              {jobOrder?.car_model
                ? jobOrder.car_model.toUpperCase()
                : "Sin definir"}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="grid grid-cols-2 gap-2">
          {consumedMaterials.length > 0 ? (
            <Tooltip
              title={
                <div>
                  {consumedMaterials.slice(0, 3).map((item, idx) => {
                    return (
                      <div key={idx} className="text-xs py-1">
                        •{" "}
                        {item?.consumption_material?.material?.name ||
                          "Material"}
                        : {item?.quantity}
                      </div>
                    );
                  })}
                  {consumedMaterials.length > 3 && (
                    <div className="text-xs">
                      + {consumedMaterials.length - 3} más...
                    </div>
                  )}
                </div>
              }
            >
              <div className="bg-amber-50 rounded-lg p-2 border border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors">
                <div className="flex items-center gap-2">
                  <ToolOutlined className="text-amber-700" />
                  <div>
                    <p className="text-xs text-gray-600 mb-0">Materiales</p>
                    <Badge
                      count={consumedMaterials.length}
                      className="text-xs font-bold"
                      style={{ backgroundColor: "#b45309" }}
                    />
                  </div>
                </div>
              </div>
            </Tooltip>
          ) : (
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <div className="flex items-center gap-2">
                <ToolOutlined className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-0">Materiales</p>
                  <span className="text-xs text-gray-400">Sin materiales</span>
                </div>
              </div>
            </div>
          )}

          {consumedColors.length > 0 ? (
            <Tooltip
              title={
                <div>
                  {consumedColors.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="text-xs py-1">
                      • {item?.name}: {item?.quantity}
                    </div>
                  ))}
                  {consumedColors.length > 3 && (
                    <div className="text-xs">
                      + {consumedColors.length - 3} más...
                    </div>
                  )}
                </div>
              }
            >
              <div className="bg-pink-50 rounded-lg p-2 border border-pink-200 cursor-pointer hover:bg-pink-100 transition-colors">
                <div className="flex items-center gap-2">
                  <BgColorsOutlined className="text-pink-700" />
                  <div>
                    <p className="text-xs text-gray-600 mb-0">Colores</p>
                    <Badge
                      count={consumedColors.length}
                      className="text-xs font-bold"
                      style={{ backgroundColor: "#be185d" }}
                    />
                  </div>
                </div>
              </div>
            </Tooltip>
          ) : (
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <div className="flex items-center gap-2">
                <BgColorsOutlined className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-0">Colores</p>
                  <span className="text-xs text-gray-400">Sin colores</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <DollarOutlined className="text-green-700s text-lg" />
            </div>
            <span className="text-sm font-medium text-green-700s">
              Costo Total
            </span>
          </div>
          <span className="text-xl font-bold text-green-700s">
            {getJobOrderPrice()}
          </span>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        className="w-full h-12 bg-stone-600 border-0 font-semibold text-white shadow-sm hover:shadow-md transition-all duration-300"
        onClick={handleViewDetails}
        icon={<i className="fa fa-eye mr-2" />}
      >
        Ver detalles completos
        <ArrowRightOutlined className="ml-2" />
      </Button>
    </Card>
  );
}
