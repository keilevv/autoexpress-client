import { useState, useEffect, useCallback } from "react";
import { InputNumber, Spin, Input, Button } from "antd";
import useInventory from "../../../../hooks/useInventory";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import _debounce from "lodash/debounce";
import { unitOptions } from "../../../../helpers/constants";
import { formatToCurrency } from "../../../../helpers";

/**
 * @param {{ materials: any, setMaterials: () => void , type?: string}} props
 */

function MaterialsList({ materials, setMaterials, type }) {
  const {
    getStorageMaterials,
    storageMaterials,
    getConsumptionMaterials,
    consumptionMaterials,
    loading,
  } = useInventory();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [prices, setPrices] = useState({});
  const [listData, setListData] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    switch (type) {
      case "sales":
        getConsumptionMaterials(1, 10, "&archived=false");
        break;
      default:
        getStorageMaterials(1, 10, "&archived=false");
        break;
    }
  }, [user, type]);

  useEffect(() => {
    switch (type) {
      case "sales":
        setListData(
          consumptionMaterials.map((item) => {
            return {
              name: item.material.name,
              _id: item._id,
              key: item._id,
              quantity: item.quantity,
              unit: item.material.unit,
              price: item.material.price,
            };
          })
        );
        break;
      default:
        setListData(
          storageMaterials.map((item) => {
            return {
              name: item.name,
              _id: item._id,
              key: item._id,
              quantity: item.quantity,
              unit: item.unit,
              price: item.price,
            };
          })
        );
        break;
    }
  }, [type, storageMaterials, consumptionMaterials]);

  const onQuantityChange = (materialId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [materialId]: value,
    }));
  };
  const onPriceChange = (materialId, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [materialId]: value,
    }));
  };

  useEffect(() => {
    if (selectedMaterial && type === "sales") {
      onPriceChange(
        selectedMaterial,
        consumptionMaterials.find((item) => item._id === selectedMaterial)
          .material.price
      );
    }
  }, [selectedMaterial, type]);

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
      const price = prices[materialId] || 0;
      if (quantity > 0) {
        setMaterials((prevMaterials) => [
          ...prevMaterials,
          { material_id: materialId, quantity, price },
        ]);
        setSelectedMaterial(null);
      }
    }
  };

  function handleDebounceFn(inputValue, brand) {
    if (type === "sales") {
      getConsumptionMaterials(1, 10, `&archived=false&name=${inputValue}`);
    } else {
      getStorageMaterials(1, 10, `&archived=false&name=${inputValue}`);
    }
  }
  const debounceFn = useCallback(_debounce(handleDebounceFn, 300), []);

  return (
    <div>
      <p className="font-semibold text-base mb-5">Seleccione los materiales</p>

      <Input
        placeholder="Buscar material por nombre"
        className="w-full mb-5"
        onChange={(e) => {
          debounceFn(e.target.value);
        }}
      />
      <div className="w-full max-h-[300px] overflow-auto bg-gray-100 rounded-lg">
        {loading ? (
          <Spin className="m-auto w-full" size="large" />
        ) : (
          listData.map((material) => {
            const { _id, name, quantity, unit, price } = material;
            const isSelected = materials.some((mat) => mat.material_id === _id);
            return (
              <div
                key={_id}
                className={`flex p-4 border-b flex-col md:flex-row cursor-pointer hover:bg-gray-200 transition-colors duration-300 ${
                  isSelected ? "bg-yellow-100" : ""
                }`}
                onClick={() => setSelectedMaterial(_id)}
              >
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-base text-gray-700">{name}</p>
                  <p className="text-sm text-gray-500">
                    Cant: {quantity} x{" "}
                    {unitOptions.find((u) => u.value === unit).label}
                  </p>
                </div>
                {selectedMaterial === _id && (
                  <div className="flex gap-2 md:ml-auto pt-2 transition-opacity duration-300 max-w-[200px]">
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-red-700">
                        Cant. Seleccionada
                      </p>
                      <InputNumber
                        min={0}
                        max={quantity}
                        value={quantities[_id]}
                        onChange={(value) => onQuantityChange(_id, value)}
                        placeholder="Cantidad"
                        className="w-full h-8"
                      />
                      {type === "sales" && (
                        <>
                          {" "}
                          <p className="text-base text-red-700">
                            Precio unidad
                          </p>
                          <InputNumber
                            min={0}
                            onChange={(value) => onPriceChange(_id, value)}
                            placeholder="Precio"
                            className="w-full h-8"
                            defaultValue={price}
                            formatter={(value) =>
                              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                          />
                        </>
                      )}
                      <Button
                        type="primary"
                        onClick={() => toggleMaterial(_id)}
                        className="w-full h-8 max-w-[100px] bg-red-700 hover:bg-red-800 mt-2"
                      >
                        {isSelected ? "Borrar" : "Agregar"}
                      </Button>
                    </div>
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
              const { material_id, quantity, price } = selectedMaterial;
              const material =
                type === "sales"
                  ? consumptionMaterials.find((m) => m._id === material_id)
                  : storageMaterials.find((m) => m._id === material_id);

              if (!material) return null; // Safeguard in case of deleted material
              const { name, unit, material: storageMaterial } = material;

              return (
                <div className="flex border-b" key={material_id}>
                  <div className="flex py-4 flex-col md:flex-row">
                    <div className="flex flex-col">
                      <p className="font-medium text-base text-gray-700">
                        {name || storageMaterial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Cant: {quantity} x{" "}
                        {
                          unitOptions.find((u) => {
                            if (storageMaterial) {
                              return u.value === storageMaterial.unit;
                            } else {
                              return u.value === unit;
                            }
                          }).label
                        }
                      </p>
                      {type === "sales" && (
                        <p className="text-sm text-gray-500">
                          Precio:{" "}
                          {formatToCurrency(price) === "$0"
                            ? formatToCurrency(storageMaterial.price)
                            : formatToCurrency(price)}
                        </p>
                      )}
                    </div>
                  </div>
                  <DeleteOutlined
                    className="ml-auto p-4"
                    onClick={() => toggleMaterial(material_id)}
                  />
                </div>
              );
            })}
            {type === "sales" && (
              <p className="text-base text-red-700 mt-5">Total: </p>
            )}
            {type === "sales" && (
              <p className="text-lg text-red-700">
                {formatToCurrency(
                  materials.reduce((acc, mat) => {
                    const { price, quantity } = mat;
                    return acc + price * quantity;
                  }, 0)
                )}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MaterialsList;
