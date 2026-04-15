import React, { useState } from "react";
import {
  Typography,
  Upload,
  Button,
  Card,
  Space,
  Table,
  notification,
  Divider,
} from "antd";
import { UploadOutlined, FileTextOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import materialsService from "../../../../services/inventory";

const { Title, Text, Paragraph } = Typography;

const columns = [
  { title: "Encabezado Inglés", dataIndex: "en", key: "en" },
  { title: "Encabezado Español", dataIndex: "es", key: "es" },
  { title: "Descripción", dataIndex: "desc", key: "desc" },
];

const data = [
  { key: "1", en: "name", es: "nombre", desc: "Nombre del producto" },
  { key: "2", en: "reference", es: "referencia", desc: "Código de referencia único" },
  { key: "3", en: "unit", es: "unidad", desc: "Unidad de medida" },
  { key: "4", en: "quantity", es: "cantidad", desc: "Cantidad de stock actual" },
  { key: "5", en: "price", es: "precio", desc: "Precio unitario" },
  { key: "6", en: "owner", es: "propietario / dueño", desc: "Propietario del material (autoexpress, autodetailing)" },
  { key: "7", en: "caution_quantity", es: "cantidad_precaucion", desc: "Alerta de stock mínimo" },
  { key: "8", en: "is_color", es: "es_color", desc: "Booleano (true/false) / (sí/no)" },
  { key: "9", en: "normalized_weight", es: "peso_normalizado", desc: "Peso base para mezcla de colores" },
];

function InventorySettingsContainer() {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);

  const handleUpload = ({ file }) => {
    setLoading(true);
    materialsService
      .uploadStorageMaterials(token, file)
      .then((res) => {
        notification.success({
          message: "Inventario Subido",
          description: `${res.data.message}`,
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error al Subir",
          description: err.response?.data?.error || "Error al subir el archivo",
        });
      })
      .finally(() => {
        setLoading(false);
      });
    return false; // Prevent default upload behavior
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Card
        title={
          <Space>
            <FileTextOutlined />
            <span>Importación de Inventario</span>
          </Space>
        }
      >
        <Paragraph>
          Sube un archivo CSV para importar o actualizar materiales de almacenamiento de forma masiva.
          Los encabezados compatibles se enumeran a continuación tanto en inglés como en español.
        </Paragraph>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
          bordered
        />
        <Divider />
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Upload
            beforeUpload={(file) => {
              handleUpload({ file });
              return false;
            }}
            showUploadList={false}
            accept=".csv"
          >
            <Button
              type="primary"
              icon={<UploadOutlined />}
              loading={loading}
              size="large"
            >
              Seleccionar y Subir Archivo CSV
            </Button>
          </Upload>
          <div style={{ marginTop: 10 }}>
            <Text type="secondary">Formato compatible: solo .csv</Text>
          </div>
        </div>
      </Card>
    </Space>
  );
}

export default InventorySettingsContainer;
