import {
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function JobCard({ job }) {
  const navigate = useNavigate();
  return (
    <Card
      title={
        <div className="flex gap-2">
          <FileOutlined className="text-xl" />
          <p className="text-xl font-semibold"> {job.number}</p>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 ">
          <CalendarOutlined className="text-base" />
          <p className="text-base">{dayjs(job.date).format("DD/MM/YYYY")}</p>
        </div>
        <div className="flex gap-2 ">
          <UserOutlined className="text-base" />
          <p className="text-base">{job.employee.name}</p>
        </div>
        <div className="flex gap-2  ">
          <CarOutlined className="text-base" />
          <p className="text-base">{job.car_plate.toUpperCase()}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-base font-semibold text-red-700 ">Estado:</p>
          <div className="bg-gray-200 p-2 rounded-lg mt-2">
            <p className="text-base font-semibold">{job.status}</p>
          </div>
          <p
            className="text-base  text-red-700 mt-2 hover:underline cursor-pointer"
            onClick={() => {
              navigate(`/operations/production/jobs/${job._id}`);
            }}
          >
            Ver detalles
          </p>
        </div>
      </div>
    </Card>
  );
}

export default JobCard;
