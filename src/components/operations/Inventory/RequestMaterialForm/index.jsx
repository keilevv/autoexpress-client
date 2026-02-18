import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import MaterialsList from "../MaterialsList";
import EditSignature from "../../Settings/EditSignature";
import useAuth from "../../../../hooks/useAuth";

function RequestMaterialForm({
  owner,
  handleRequestStorageMaterial = () => {},
  loading = false,
}) {
  const { updateUser } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [signature, setSignature] = useState(null);
  const [isValidSignature, setIsValidSignature] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (signature) {
      const img = new Image();
      img.src = signature;
      img.onload = () => setIsValidSignature(true);
      img.onerror = () => setIsValidSignature(false);
    } else {
      setIsValidSignature(false);
    }
  }, [signature]);

  useEffect(() => {
    if (user?.signature) {
      setSignature(user.signature);
    }
  }, [user]);

  useEffect(() => {
    form.setFieldValue("materials", materials);
    if (materials.length > 0 && signature && isValidSignature) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [materials, signature, isValidSignature, form]);

  const onFinish = (values) => {
    const payload = {
      ...values,
      signature,
      owner: owner ? owner : "autoexpress",
    };
    handleRequestStorageMaterial(payload);
  };

  return (
    <div className="bg-white px-4 rounded-lg shadow-sm">
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

        <div className="mt-4">
          <EditSignature
            loading={loading}
            user={user}
            onUpdateSignature={(img) => {
              updateUser(user.id, { signature: img })
                .then((response) => {
                  notification.success({
                    message: "Firma actualizada",
                    description: "La firma ha sido actualizada correctamente.",
                  });
                  setSignature(response?.results?.signature);
                })
                .catch((err) => {
                  notification.error({
                    message: "Error al actualizar firma",
                    description: err.message || "Ocurrió un error inesperado.",
                  });
                });
            }}
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
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
