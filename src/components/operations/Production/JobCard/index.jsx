import {
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
function JobCard({ job }) {
  return (
    <Card
      title={
        <div className="flex gap-2">
          <FileOutlined className="text-xl" />
          <p className="text-xl font-semibold"> {job.work_order}</p>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 ">
          <CalendarOutlined className="text-base" />
          <p className="text-base">{job.due_date}</p>
        </div>
        <div className="flex gap-2 ">
          <UserOutlined className="text-base" />
          <p className="text-base">{job.operator}</p>
        </div>
        <div className="flex gap-2  ">
          <CarOutlined className="text-base" />
          <p className="text-base">{job.car_plate}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-base font-semibold text-red-700 ">Estado:</p>
          <div className="bg-gray-200 p-2 rounded-lg mt-2">
            <p className="text-base font-semibold">{job.status}</p>
          </div>
          <p className="text-base  text-red-700 mt-2 hover:underline cursor-pointer">
            Ver detalles
          </p>
        </div>
      </div>
    </Card>
  );
}

export default JobCard;
