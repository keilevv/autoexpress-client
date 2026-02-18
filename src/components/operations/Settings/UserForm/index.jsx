import { useState, useEffect } from "react";
import DigitalSignature from "../../../Common/DigitalSignature";
import { Button, Tooltip, Input, Skeleton } from "antd";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import EditSignature from "../EditSignature";

function UserForm({
  loading = false,
  user = {},
  onUpdateUser = () => {},
  onUpdateSignature = () => {},
}) {
  const [showSignature, setShowSignature] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [userData, setUserData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setShowSave(true);
  };

  useEffect(() => {
    setUserData({
      username: user.username,
      email: user.email,
      signature: user.signature,
    });
  }, [user]);

  return (
    <div className="flex flex-col gap-4">
      <div className=" bg-gray-50 p-4 rounded-lg">
        {loading ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <Tooltip title={isEditing ? "Cancelar" : "Editar"}>
                <Button
                  className="w-fit ml-auto"
                  shape="circle"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <i className="fa-solid fa-pen icon"></i>
                </Button>
              </Tooltip>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Nombre de usuario</p>
                {isEditing ? (
                  <Input
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.username}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Correo electrónico</p>
                {isEditing ? (
                  <Input
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.email}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              {showSave && (
                <Button
                  type="primary"
                  icon={<FaSave />}
                  onClick={() => {
                    onUpdateUser(user);
                    setShowSave(false);
                    setIsEditing(false);
                  }}
                  className="bg-red-700 hover:bg-red-800"
                >
                  Guardar
                </Button>
              )}
              {isEditing && (
                <Button
                  type="text"
                  icon={<FaTimes />}
                  onClick={() => {
                    setShowSave(false);
                    setIsEditing(false);
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      <EditSignature
        loading={loading}
        user={user}
        onUpdateSignature={onUpdateSignature}
      />
    </div>
  );
}
export default UserForm;
