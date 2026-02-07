import { useState, useEffect } from "react";
import { Table, Tag, Button, Input, Select, Modal } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";

function InventoryRequest() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">
        Solictud de materiales
      </h1>
    </>
  );
}

export default InventoryRequest;
