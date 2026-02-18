import { useState, useEffect } from "react";
import DigitalSignature from "../../../Common/DigitalSignature";
import { Button, Skeleton } from "antd";
import { FaEdit } from "react-icons/fa";

function EditSignature({
  loading = false,
  user = {},
  onUpdateSignature = () => {},
}) {
  const [showSignature, setShowSignature] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      signature: user.signature,
    });
  }, [user]);

  return (
    <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg">
      <p className="font-semibold">Firma</p>
      {loading ? (
        <Skeleton.Image
          active
          className="w-full  justify-center items-center m-auto"
        />
      ) : (
        <>
          {showSignature ? (
            <DigitalSignature
              onCancel={() => setShowSignature(false)}
              onSave={(img) => {
                onUpdateSignature(img);
                setShowSignature(false);
              }}
            />
          ) : userData.signature ? (
            <img
              src={userData.signature}
              alt="user_signature"
              className="w-full h-full max-h-48 object-contain"
            />
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
        </>
      )}
    </div>
  );
}
export default EditSignature;
