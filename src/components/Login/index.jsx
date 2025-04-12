import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Form, notification } from "antd";
import logo from "../../assets/images/autoexpresslogo.png";
/* Reducers */
/* Custom hooks */
import useAuth from "../../hooks/useAuth";
import useViewport from "../../hooks/useViewport";
import "./style.css";

function Login() {
  const user = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const { isMobileScreen } = useViewport();

  const onFinish = async (values) => {
    setLoading(true);
    loginUser(values.username, values.password)
      .then((response) => {
        setLoading(false);
        notification.success({
          message: "Bienvenido",
          description: values.username,
        });
        if (response?.data.roles?.includes("autodetailing-operator")) {
          navigate("/operations/production/autodetailing");
        } else {
          navigate("/operations/dashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: "Error al iniciar sesion",
        });
      });
  };

  return (
    <div>
      <Form name="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su usuario!",
            },
          ]}
        >
          <Input className="login-input" placeholder="Usuario" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su contrasena!",
            },
          ]}
        >
          <Input.Password className="login-input" placeholder="Contrasena" />
        </Form.Item>
        {isRegisterForm && (
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingrese un email valido!",
              },
            ]}
          >
            <Input className="login-input" placeholder="Email" />
          </Form.Item>
        )}
        <Form.Item>
          <Button
            className="login-submit-button"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
