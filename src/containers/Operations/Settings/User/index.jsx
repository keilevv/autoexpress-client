import { useSelector } from "react-redux";
import UserForm from "../../../../components/operations/Settings/UserForm";
import useAuth from "../../../../hooks/useAuth";
import { notification } from "antd";

function UserSettingsContainer() {
  const { loading, updateUser } = useAuth();

  const user = useSelector((state) => state.auth.user);

  const handleUpdateUser = (data) => {
    updateUser(user.id, data)
      .then(() => {
        notification.success({
          message: "Usuario actualizado",
          description: "Usuario actualizado correctamente",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error al actualizar usuario",
          description: "Error al actualizar usuario",
        });
      });
  };
  const handleUpdateSignature = (signature) => {
    updateUser(user.id, { signature })
      .then(() => {
        notification.success({
          message: "Firma actualizada",
          description: "Firma actualizada correctamente",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error al actualizar firma",
          description: "Error al actualizar firma",
        });
      });
  };

  return (
    <UserForm
      loading={loading}
      user={user}
      onUpdateUser={handleUpdateUser}
      onUpdateSignature={handleUpdateSignature}
    />
  );
}
export default UserSettingsContainer;
