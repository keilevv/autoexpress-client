import { useState, useEffect } from "react";
import { Form, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import MaterialsList from "../MaterialsList";
import useInventory from "../../../../hooks/useInventory";
import DigitalSignature from "../../../../components/Common/DigitalSignature";

function RequestMaterialForm({ owner }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { createConsumptionMaterial, loading } = useInventory();
  const [materials, setMaterials] = useState([]);
  const [signature, setSignature] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    form.setFieldValue("materials", materials);
    if (materials.length > 0 && signature) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [materials, signature, form]);

  const onFinish = (values) => {
    const payload = {
      ...values,
      signature,
      owner: owner ? owner : "autoexpress",
    };
    createConsumptionMaterial(payload)
      .then(() => {
        notification.success({
          message: "Solicitud enviada",
          description: "Los materiales han sido solicitados correctamente.",
        });
        navigate(`/operations/inventory/${owner}/consumption`);
      })
      .catch((err) => {
        notification.error({
          message: "Error al enviar solicitud",
          description: err.message || "Ocurrió un error inesperado.",
        });
      });
  };

  return (
    <div className="bg-white px-6 rounded-lg shadow-sm">
      <Form
        name="request-material-form"
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="materials">
          <MaterialsList
            owner={owner}
            materials={materials}
            setMaterials={setMaterials}
          />
        </Form.Item>

        <div className="max-w-[500px]">
          <DigitalSignature
            onSave={(img) => setSignature(img)}
            onClear={() => setSignature(null)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={() => navigate(-1)}>Cancelar</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={disabled}
            className="bg-red-700 hover:bg-red-800"
          >
            Enviar solicitud
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RequestMaterialForm;
