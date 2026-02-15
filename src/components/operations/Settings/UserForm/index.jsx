import { useState, useEffect } from "react";
import DigitalSignature from "../../../Common/DigitalSignature";
import { Button, Tooltip, Input } from "antd";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
function UserForm({
  user = {},
  onUpdateUser = () => {},
  onUpdateSignature = () => {},
}) {
  const [showSignature, setShowSignature] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setShowSave(true);
  };

  useEffect(() => {
    if (!isEditing) {
      setUserData({
        username: user.username,
        email: user.email,
      });
      setShowSave(false);
    }
  }, [isEditing, user]);

  return (
    <div className="flex flex-col gap-4">

      <div className=" bg-gray-50 p-4 rounded-lg">
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
              <p>{user.username}</p>
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
              <p>{user.email}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          {showSave && (
            <Button
              type="primary"
              icon={<FaSave />}
              onClick={() => {
                onUpdateUser(userData);
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
      </div>

      <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg">
        <p className="font-semibold">Firma</p>
        {showSignature ? (
          <DigitalSignature
            onCancel={() => setShowSignature(false)}
            onSave={(img) => {
              onUpdateSignature(img);
              setShowSignature(false);
            }}
          />
        ) : userData.signature ? (
          <img src={user.signature} alt="" />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-sm text-gray-500">No hay firma</p>
          </div>
        )}
        {!showSignature && (
          <Button
            type="link"
            icon={<FaEdit />}
            onClick={() => setShowSignature(true)}
          >
            Editar
          </Button>
        )}
      </div>
    </div>
  );
}
export default UserForm;
