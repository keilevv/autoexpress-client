import {
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Card, Button } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function JobCard({ job }) {
  const navigate = useNavigate();
  return (
    <Card
      title={
        <div className="flex gap-4">
          <FileOutlined className="text-xl" />
          <p className="text-xl font-semibold"> O.T. {job.number}</p>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 ">
          <CalendarOutlined className="text-base" />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-red-700">
              Fecha de entrega
            </p>
            <p className="text-base text-gray-700">
              {dayjs(job.date).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
        <div className="flex gap-4 ">
          <UserOutlined className="text-base" />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-red-700">Trabajador</p>
            <p className="text-base text-gray-700">{job.employee.name}</p>
          </div>
        </div>
        <div className="flex gap-4  ">
          <CarOutlined className="text-base" />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-red-700">Placa</p>

            <p className="text-base text-gray-700">
              {job.car_plate.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-4">
          {/* <p className="text-base font-semibold text-red-700 ">Estado:</p>
          <div className="bg-gray-200 p-2 rounded-lg mt-2">
            <p className="text-base font-semibold">
              {job.consumed_materials.length > 0
                ? "Materiales asignados"
                : "Materiales sin asignar"}
            </p>
          </div> */}
          <Button
            className="text-base font-semibold text-red-700  hover:underline cursor-pointer"
            onClick={() => {
              navigate(`/operations/production/jobs/${job._id}`);
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
