import React, { useState } from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./style.css";

const GlaringText = ({ text }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex absolute bottom-10 h-[50px] z-10">
      <div
        className={`overflow-hidden bg-red-500 flex items-center  ${
          open ? "p-4" : "w-0"
        }`}
        onClick={() => {
          window.open(
            "https://api.whatsapp.com/send?phone=3182066879&text=Hola%2C%20vengo%20desde%20la%20p%C3%A1gina%20web%20y%20quisiera%20saber%20m%C3%A1s%20informaci%C3%B3n%20acerca%20de%20la%20venta%20de%20SOAT.",
            "_blank"
          );
        }}
      >
        <a
          className={` text-xl text-white ${open ? "" : "hidden"} 
          } hover:text-white underline-offset-4`}
        >
          {text}
        </a>
      </div>
      <div
        className="flex items-center  p-4 cursor-pointer hover:bg-red-400 outline-white bg-red-500"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? (
          <MenuFoldOutlined className="text-xl text-white glaring-text" />
        ) : (
          <MenuUnfoldOutlined className="text-xl text-white" />
        )}
      </div>
    </div>
  );
};

export default GlaringText;
