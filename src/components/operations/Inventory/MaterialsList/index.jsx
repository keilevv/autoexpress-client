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
    count,
  } = useInventory();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [prices, setPrices] = useState({});
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const filter = `&archived=false&owner=${owner}${
      searchTerm ? "&search=" + searchTerm : ""
    }`;
    switch (type) {
      case "job-order-materials":
      case "sales":
        getConsumptionMaterials(page, 10, filter);
        break;
      default:
        getStorageMaterials(page, 10, filter);
        break;
    }
  }, [user, type, isEditing, owner, page, searchTerm]);

  useEffect(() => {
    let newData = [];
    switch (type) {
      case "job-order-materials":
        if (isEditing) {
          newData = consumptionMaterials.map((item, index) => ({
            name: item.material.name,
            _id: item._id,
            key: index,
            quantity: item.quantity,
            unit: item.material.unit,
            price: item.material.price,
            reference: item.material.reference,
          }));
        } else {
          materials.forEach((material, index) => {
            if (material.storage_material) {
              newData.push({
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
        }
        break;
      case "sales":
        newData = consumptionMaterials.map((item) => ({
          name: item.material.name,
          _id: item._id,
          key: item._id,
          quantity: item.quantity,
          unit: item.material.unit,
          price: item.material.price,
          reference: item.material.reference,
        }));
        break;

      default:
        newData = storageMaterials.map((item) => ({
          name: item.name,
          _id: item._id,
          key: item._id,
          quantity: item.quantity,
          unit: item.unit,
          price: item.price,
          reference: item.reference,
        }));
        break;
    }

    if (page === 1) {
      setListData(newData);
    } else {
      setListData((prev) => {
        const existingIds = new Set(prev.map((item) => item._id));
        const filteredNewData = newData.filter(
          (item) => !existingIds.has(item._id)
        );
        return [...prev, ...filteredNewData];
      });
    }

    setHasMore(listData.length + newData.length < count);
  }, [storageMaterials, consumptionMaterials, count]);

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
      return isProduction
        ? material.consumption_material === materialId
        : material.material_id === materialId;
    });

    setSelectedMaterial(null);
    if (existingMaterial) {
      // Remove material from the list
      setMaterials((prevMaterials) =>
        prevMaterials.filter((material) =>
          isProduction
            ? material.consumption_material !== materialId
            : material.material_id !== materialId
        )
      );
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities };
        delete newQuantities[materialId];
        return newQuantities;
      });
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

  function handleDebounceFn(inputValue) {
    setSearchTerm(inputValue);
    setPage(1);
    setListData([]);
    setHasMore(true);
  }
  const debounceFn = useCallback(_debounce(handleDebounceFn, 300), []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 20 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
      <div
        className="w-full max-h-[300px] overflow-auto bg-gray-100 rounded-lg"
        onScroll={handleScroll}
      >
        {loading && page === 1 ? (
          <Spin className="m-auto w-full py-10" size="large" />
        ) : (
          <>
            {listData.length > 0 ? (
              <>
                {listData.map((material, index) => {
                  if (material === null) return null;
                  const { _id, name, quantity, unit, price, reference } =
                    material;
                  const isSelected = materials.some((mat) =>
                    isProduction
                      ? mat.consumption_material === _id
                      : mat.material_id === _id
                  );
                  const isOutOfStock = quantity <= 0;
                  return (
                    <div
                      key={index}
                      className={`flex p-4 border-b flex-col md:flex-row transition-colors duration-300 ${
                        isSelected ? "bg-yellow-100" : ""
                      } ${
                        isOutOfStock
                          ? "opacity-50 cursor-not-allowed grayscale"
                          : "cursor-pointer hover:bg-gray-200"
                      }`}
                      onClick={(e) => {
                        if (isEditing && !isOutOfStock) {
                          setSelectedMaterial(_id);
                        }
                      }}
                    >
                      <div className="flex flex-col justify-center">
                        <p className="font-medium text-base text-gray-700">
                          {name} {reference ? `(${reference})` : ""}
                        </p>
                          {isOutOfStock ? (
                            <p className="text-sm text-red-600 font-semibold italic">
                              Agotado
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">
                              {isEditing
                                ? "Cant. Disponible"
                                : "Cant. Consumida"}{" "}
                              {quantities[_id]
                                ? quantity - quantities[_id]
                                : quantity}{" "}
                              -{" "}
                              {
                                unitOptions.find((u) => u.value === unit)
                                  ?.label
                              }
                            </p>
                          )}
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
                {loading && page > 1 && (
                  <Spin className="w-full py-4" size="small" />
                )}
              </>
            ) : (
              <span className="text-sm text-gray-500 font-medium p-4 block">
                No hay materiales disponibles
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

              const material = listData.find(
                (m) => m._id === selectedMaterialId
              );

              if (!material) return null; // Safeguard in case material is not in listData
              const { name, unit } = material;

              return (
                <div className="flex border-b" key={index}>
                  <div className="flex py-4 flex-col md:flex-row">
                    <div className="flex flex-col">
                      <p className="font-medium text-base text-gray-700">
                        {name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Cant: {quantity} x{" "}
                        {unitOptions.find((u) => u.value === unit)?.label}
                      </p>
                      {type === "sales" && (
                        <p className="text-sm text-gray-500">
                          Precio: {formatToCurrency(price)}
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
