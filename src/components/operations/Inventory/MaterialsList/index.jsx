import { useState, useEffect, useCallback } from "react";
import { InputNumber, Spin, Input, Button } from "antd";
import useInventory from "../../../../hooks/useInventory";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import _debounce from "lodash/debounce";
import { unitOptions } from "../../../../helpers/constants";
import { formatToCurrency } from "../../../../helpers";
import "./style.css";

/**
 * @param {{ materials: any[], setMaterials: () => void , type?: string}} props
 */

function MaterialsList({
  materials = [],
  setMaterials,
  type,
  isReadOnly = false,
  isEditing = true,
  isProduction = false,
  owner = "autoexpress",
}) {
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
      case "job-order-materials":
      case "sales":
        getConsumptionMaterials(1, 10, `&archived=false&owner=${owner}`);
        break;
      default:
        getStorageMaterials(1, 10, `&archived=false&owner=${owner}`);
        break;
    }
  }, [user, type, isEditing, owner]);

  useEffect(() => {
    switch (type) {
      case "job-order-materials":
        if (isEditing) {
          setListData(
            consumptionMaterials.map((item, index) => {
              return {
                name: item.material.name,
                _id: item._id,
                key: index,
                quantity: item.quantity,
                unit: item.material.unit,
                price: item.material.price,
                reference: item.material.reference,
              };
            })
          );
        } else {
          const newListData = [];
          materials.map((material, index) => {
            if (material.storage_material) {
              newListData.push({
                name: material.storage_material.name,
                _id: material.consumption_material,
                key: index,
                quantity: material.quantity,
                unit: material.storage_material.unit,
                price: material.storage_material.price,
                reference: material.storage_material.reference,
              });
            }
          });

          setListData(newListData);
        }
        break;
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
              reference: item.material.reference,
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
              reference: item.reference,
            };
          })
        );
        break;
    }
  }, [storageMaterials, consumptionMaterials]);

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
    const existingMaterial = materials.find((material) => {
      return material.consumption_material === materialId;
    });
    setSelectedMaterial(null);
    if (existingMaterial) {
      // Remove material from the list
      setMaterials((prevMaterials) =>
        prevMaterials.filter(
          (material) => material.consumption_material !== materialId
        )
      );
      setSelectedMaterial(null);
    } else {
      // Add material to the list
      const quantity = quantities[materialId] || 0;
      const price = prices[materialId] || 0;
      if (quantity >= 0) {
        setMaterials((prevMaterials) => {
          if (isProduction) {
            return [
              ...prevMaterials,
              { consumption_material: materialId, quantity, price },
            ];
          } else {
            return [
              ...prevMaterials,
              { material_id: materialId, quantity, price },
            ];
          }
        });
        setSelectedMaterial(null);
      }
    }
  };

  function handleDebounceFn(inputValue, brand) {
    if (type === "sales" || type === "job-order-materials") {
      getConsumptionMaterials(
        1,
        10,
        `&archived=false&search=${inputValue}&owner=${owner}`
      );
    } else {
      getStorageMaterials(
        1,
        10,
        `&archived=false&search=${inputValue}&owner=${owner}`
      );
    }
  }
  const debounceFn = useCallback(_debounce(handleDebounceFn, 300), []);

  useEffect(() => {
    setSelectedMaterial(null);
  }, [isEditing]);

  return (
    <div>
      {!isReadOnly && (
        <>
          <p className="font-semibold text-base mb-4">
            Seleccione los materiales
          </p>
          <Input
            placeholder="Buscar material por nombre"
            className="w-full mb-4"
            onChange={(e) => {
              debounceFn(e.target.value);
            }}
          />
        </>
      )}
      <div className="w-full max-h-[300px] overflow-auto bg-gray-100 rounded-lg">
        {loading ? (
          <Spin className="m-auto w-full" size="large" />
        ) : (
          <>
            {listData.length > 0 ? (
              <>
                {listData.map((material, index) => {
                  if (material === null) return null;
                  const { _id, name, quantity, unit, price, reference } =
                    material;
                  const isSelected = materials.some(
                    (mat) => mat.material_id === _id
                  );
                  return (
                    <div
                      key={index}
                      className={`flex p-4 border-b flex-col md:flex-row cursor-pointer hover:bg-gray-200 transition-colors duration-300 ${
                        isSelected ? "bg-yellow-100" : ""
                      }`}
                      onClick={(e) => {
                        if (isEditing) {
                          setSelectedMaterial(_id);
                        }
                      }}
                    >
                      <div className="flex flex-col justify-center">
                        <p className="font-medium text-base text-gray-700">
                          {name} {reference ? `(${reference})` : ""}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isEditing ? "Cant. Disponible" : "Cant. Consumida"}{" "}
                          {quantity} -{" "}
                          {unitOptions.find((u) => u.value === unit).label}
                        </p>
                      </div>
                      {selectedMaterial === _id && isEditing && (
                        <div className="flex gap-2 md:ml-auto pt-2 transition-opacity duration-300 max-w-[200px]">
                          <div className="flex flex-col gap-2">
                            <p className="text-base text-red-700">
                              Cant. Seleccionada
                            </p>
                            <InputNumber
                              max={quantity}
                              min={0}
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
                                  onChange={(value) =>
                                    onPriceChange(_id, value)
                                  }
                                  placeholder="Precio"
                                  className="w-full h-8"
                                  defaultValue={price}
                                  formatter={(value) =>
                                    `$ ${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )
                                  }
                                />
                              </>
                            )}
                            <Button
                              type="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMaterial(_id);
                              }}
                              className="w-full h-8 max-w-[100px] bg-red-700 hover:bg-red-800 mt-2"
                            >
                              {isSelected ? "Borrar" : "Agregar"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <span className="text-sm text-gray-500 font-medium">
                No hay materiales consumidos
              </span>
            )}
          </>
        )}
      </div>
      {materials.length > 0 && isEditing && (
        <>
          <p className="text-base text-red-700 mt-5">Seleccionados</p>
          <div className="w-full max-h-[300px] overflow-auto pr-2">
            {materials.map((selectedMaterial, index) => {
              const { quantity, price } = selectedMaterial;

              const selectedMaterialId = isProduction
                ? selectedMaterial.consumption_material
                : selectedMaterial.material_id;

              const material =
                type === "sales" || type === "job-order-materials"
                  ? consumptionMaterials.find(
                      (m) => m._id === selectedMaterialId
                    )
                  : storageMaterials.find((m) => m._id === selectedMaterialId);

              if (!material) return null; // Safeguard in case of deleted material
              const { name, unit, material: storageMaterial } = material;

              return (
                <div className="flex border-b" key={index}>
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
                    onClick={() => toggleMaterial(selectedMaterialId)}
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
