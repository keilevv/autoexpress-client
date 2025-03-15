import { useState, useEffect } from "react";
import { Card, Button, Divider, Tag } from "antd";
import {
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
  DollarOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import StatusLabel from "../StatusLabel";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { formatToCurrency } from "../../../../helpers";

export default function JobCard({ jobOrder }) {
  const navigate = useNavigate();
  const [consumedMaterials, setConsumedMaterials] = useState([]);
  const [consumedColors, setConsumedColors] = useState([]);

  function getJobOrderPrice() {
    let materialsCost = consumedMaterials
      .map((item) => item?.price * item?.quantity)
      .reduce((a, b) => a + b, 0);
    let materialsPrice = consumedMaterials
      .map((item) => item?.sell_price * item?.quantity)
      .reduce((a, b) => a + b, 0);
    let colorsPrice = consumedColors
      .map((item) => item?.price)
      .reduce((a, b) => a + b, 0);
    materialsPrice = isNaN(materialsPrice) ? 0 : materialsPrice;
    colorsPrice = isNaN(colorsPrice) ? 0 : colorsPrice;
    let marginPrice = formatToCurrency(
      consumedMaterials
        .map((item) => Math.abs(item.sell_price - item.price) * item?.quantity)
        .reduce((a, b) => a + b, 0) +
        consumedColors.map((item) => item?.price).reduce((a, b) => a + b, 0)
    );
    return {
      cost: formatToCurrency(materialsCost),
      total: formatToCurrency(materialsPrice + colorsPrice),
      margin: marginPrice,
    };
  }

  useEffect(() => {
    if (jobOrder?.consumed_materials?.length > 0) {
      setConsumedMaterials(
        jobOrder.consumed_materials.map((item) => ({
          storage_material: item.storage_material,
          quantity: item.quantity,
          sell_price: item.sell_price,
          price: item.price,
        }))
      );
    }
    if (jobOrder?.consumed_colors?.length > 0) {
      setConsumedColors(jobOrder.consumed_colors);
    }
  }, [jobOrder]);

  return (
    <Card className="w-full max-w-md">
      <div className="p-2">
        {/* Header */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileOutlined className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">O.T. {jobOrder.number}</span>
              </div>
            </div>
            <div className="mt-2">
              <StatusLabel status={jobOrder?.status[0]} isJobCard={true} />
            </div>
          </div>
          {jobOrder.archived && (
            <div className="">
              <Tag className={"max-w-[70px]"} color={"gray"}>
                Archivada
              </Tag>
            </div>
          )}
        </div>

        <Divider className="my-2" />

        {/* Main Content */}
        <div className="grid gap-3">
          {jobOrder?.description && (
            <p className="text-sm text-muted-foreground">
              {jobOrder.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <CalendarOutlined className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">
                {dayjs(jobOrder.created_date).format("DD/MM/YYYY")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <UserOutlined className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">
                {jobOrder.employee.name}
              </span>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-muted/50 rounded-lg space-y-2 p-3 bg-gray-200">
            <div className="flex items-center gap-2">
              <CarOutlined className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {jobOrder.car_plate.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 ">
              <div className="flex-col">
                <p className="font-semibold">Marca</p>
                {jobOrder?.car_brand
                  ? jobOrder.car_brand.toUpperCase()
                  : "Sin definir"}
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Modelo</p>
                {jobOrder?.car_model
                  ? jobOrder.car_model.toUpperCase()
                  : "Sin definir"}
              </div>
            </div>
          </div>

          {/* Cost */}
          <div className="flex items-center justify-between bg-primary/5 rounded-lg pt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Costo</span>
            </div>
            <span className="font-semibold">{getJobOrderPrice().cost}</span>
          </div>
          <div className="flex items-center justify-between bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Margen</span>
            </div>
            <span className="font-semibold text-green-600">{getJobOrderPrice().margin}</span>
          </div>
          <div className="flex items-center justify-between bg-primary/5 rounded-lg pb-3">
            <div className="flex items-center gap-2">
              <DollarOutlined className="h-4 w-4 text-muted-foreground" />
              <span className="text-base font-medium">Total</span>
            </div>
            <span className="font-semibold text-base text-blue-800">{getJobOrderPrice().total}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="w-full items-center justify-center flex font-semibold text-blue-800"
          onClick={() =>
            navigate(`/operations/production/jobs/${jobOrder._id}`)
          }
        >
          Ver detalles
          <ArrowRightOutlined className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </Card>
  );
}
