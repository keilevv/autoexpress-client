import { useState, useEffect } from "react";
import { InputNumber, Spin, Input, Button } from "antd";
import useInventory from "../../../../hooks/useInventory";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

function MaterialsList({ materials, setMaterials }) {
  const { getStorageMaterials, storageMaterials, loading } = useInventory();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantities, setQuantities] = useState({});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getStorageMaterials(1, 10, "&archived=false");
  }, [user]);

  const onQuantityChange = (materialId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [materialId]: value,
    }));
  };

  const toggleMaterial = (materialId) => {
    const existingMaterial = materials.find(
      (material) => material.material_id === materialId
    );

    if (existingMaterial) {
      // Remove material from the list
      setMaterials((prevMaterials) =>
        prevMaterials.filter((material) => material.material_id !== materialId)
      );
      setSelectedMaterial(null);
    } else {
      // Add material to the list
      const quantity = quantities[materialId] || 0;
      if (quantity > 0) {
        setMaterials((prevMaterials) => [
          ...prevMaterials,
          { material_id: materialId, quantity },
        ]);
        setSelectedMaterial(null);
      }
    }
  };

  return (
    <div>
      <Input
        placeholder="Buscar por nombre o referencia"
        className="w-full mb-5"
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="w-full max-h-[300px] overflow-auto bg-gray-100 rounded-lg">
        {loading ? (
          <Spin className="m-auto w-full" size="large" />
        ) : (
          storageMaterials.map((material) => {
            const { _id, name, quantity, unit } = material;
            const isSelected = materials.some((mat) => mat.material_id === _id);

            return (
              <div
                key={_id}
                className={`flex p-4 border-b flex-col md:flex-row cursor-pointer hover:bg-gray-200 transition-colors duration-300 ${
                  isSelected ? "bg-yellow-100" : ""
                }`}
                onClick={() => setSelectedMaterial(_id)}
              >
                <div className="flex flex-col">
                  <p className="font-medium text-base text-gray-700">{name}</p>
                  <p className="text-sm text-gray-500">
                    Cant: {quantity} - {unit}
                  </p>
                </div>
                {selectedMaterial === _id && (
                  <div className="flex gap-2 md:ml-auto pt-2 transition-opacity duration-300 max-w-[200px]">
                    <InputNumber
                      min={0}
                      max={quantity}
                      value={quantities[_id] || 0}
                      onChange={(value) => onQuantityChange(_id, value)}
                      placeholder="Cantidad"
                      className="w-full h-8"
                    />
                    <Button type="primary" onClick={() => toggleMaterial(_id)}>
                      {isSelected ? "Borrar" : "Agregar"}
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      {materials.length > 0 && (
        <>
          <p className="text-base text-red-700 mt-5">Seleccionados</p>
          <div className="w-full max-h-[300px] overflow-auto pr-2">
            {materials.map((selectedMaterial) => {
              const { material_id, quantity } = selectedMaterial;
              const material = storageMaterials.find(
                (material) => material._id === material_id
              );
              if (!material) return null; // Safeguard in case of deleted material
              const { name, unit } = material;
              return (
                <div className="flex border-b" key={material_id}>
                  <div className="flex py-4 flex-col md:flex-row">
                    <div className="flex flex-col">
                      <p className="font-medium text-base text-gray-700">
                        {name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Cant: {quantity} - {unit}
                      </p>
                    </div>
                  </div>
                  <DeleteOutlined
                    className="ml-auto p-4"
                    onClick={() => toggleMaterial(material_id)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MaterialsList;
