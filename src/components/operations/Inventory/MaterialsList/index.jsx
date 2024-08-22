import { useState, useEffect } from "react";
import { Button, List, Form, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NewServiceModal from "./NewServiceModal";
import useServices from "../../../../../hooks/useServices";
import { useStore } from "../../../../../store";
function MaterialsList({ isSelect, setPayload, payload }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getServices, services, loading } = useServices();
  const { user } = useStore();
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getServices();
  }, [user]);

  useEffect(() => {
    if (services.length) {
      const data = [];
      services.map((service) => {
        data.push({
          title: service.name,
          duration: service.duration,
          color: service.color,
          _id: service._id,
        });
      });

      setData(data);
    }
  }, [services]);

  return (
    <div>
      <List
        loading={loading}
        className="max-h-[300px] overflow-y-scroll border-2 border-slate-100 rounded-lg"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            className={`hover:bg-slate-100 rounded-lg cursor-pointer ${
              selectedServiceId === item._id ||
              (payload && payload.service_id === item._id)
                ? "bg-slate-100 outline outline-2 outline-slate-300"
                : ""
            }`}
            key={item._id}
            onClick={(e) => {
              setSelectedServiceId(item._id);
              setIsModalOpen(true);
            }}
          >
            <List.Item.Meta
              avatar={
                <div
                  className="w-5 h-5 rounded-full ml-2"
                  style={{ backgroundColor: item.color }}
                ></div>
              }
              title={<a href="#">{item.title}</a>}
              description={item.duration + " min"}
            />
          </List.Item>
        )}
      />
      {!isSelect && (
        <div className="flex justify-center mt-10 ">
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedServiceId(undefined);
              setIsModalOpen(true);
              form.resetFields();
            }}
          >
            Agregar
          </Button>
        </div>
      )}
      <NewServiceModal
        isSelect={isSelect}
        form={form}
        getServices={getServices}
        serviceId={selectedServiceId}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setPayload={setPayload}
      />
    </div>
  );
}
export default MaterialsList;
