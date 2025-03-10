import { useEffect, useCallback, useState } from "react";
import _debounce from "lodash/debounce";
import { formatToCurrency } from "../../../../../../helpers";
import { DeleteOutlined } from "@ant-design/icons";
import { Select, InputNumber, Button, Input, Divider } from "antd";
import useInventory from "../../../../../../hooks/useInventory";
import { unitOptions } from "../../../../../../helpers/constants";

function ConsumedMaterials({
  consumedMaterials = [],
  setConsumedMaterials,
  isEditing = false,
  consumedColors = [],
  setConsumedColors,
  setShowSaveMaterials = () => {},
  isSaved = false,
  setIsSaved = () => {},
  owner = "autocheck",
}) {
  const { getStorageMaterials, storageMaterials, loading } = useInventory();
  const [addedMaterial, setAddedMaterial] = useState(null);

  const [materialQuantity, setMaterialQuantity] = useState(null);
  const [existingQuantity, setExistingQuantity] = useState(0);
  const [price, setPrice] = useState(null);
  const [sellPrice, setSellPrice] = useState(null);
  const [consumptionMaterialFromList, setConsumptionMaterialFromList] =
    useState(null);

  useEffect(() => {
    if (consumedMaterials.length && addedMaterial) {
      const materialFound = consumedMaterials.find(
        (item) => item._id === addedMaterial
      );
      setConsumptionMaterialFromList(materialFound);
    }
  }, [addedMaterial, consumedMaterials]);

  useEffect(() => {
    if (isEditing) {
      getStorageMaterials(1, 10, `&archived=false&owner=${owner}`);
    }
  }, [isEditing]);

  const handleSearchMaterial = (value) => {
    getStorageMaterials(
      1,
      10,
      `&archived=false&owner=${owner}&search=${value}`
    );
  };

  useEffect(() => {
    if (materialQuantity < 0) setMaterialQuantity(null);
  }, [materialQuantity]);

  const debounceFn = useCallback(_debounce(handleSearchMaterial, 300), []);

  useEffect(() => {
    setSellPrice(price);
  }, [price]);

  console.log("consumedMaterials", consumedMaterials);

  return (
    <>
      <p className="text-lg font-medium mb-4 text-blue-800">Materiales</p>
      {isEditing && (
        <div className="mt-4 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-medium mb-2">Agregar Material</p>
              <Select
                loading={loading}
                className="w-full"
                value={addedMaterial}
                showSearch
                placeholder="Buscar..."
                optionFilterProp="children"
                onSearch={(value) => debounceFn(value)}
                onSelect={(value) => {
                  setExistingQuantity(
                    storageMaterials.find((item) => item._id === value).quantity
                  );
                  setPrice(
                    storageMaterials.find((item) => item._id === value).price
                  );
                  setSellPrice(
                    storageMaterials.find((item) => item._id === value).price
                  );
                  setAddedMaterial(value);
                }}
                allowClear
                onClear={() => setAddedMaterial(null)}
              >
                {storageMaterials.map((item) => {
                  return (
                    <Select.Option
                      key={item._id}
                      value={item._id}
                      label={item.name}
                    >
                      {`${item.name}  (${item.reference}) - ${
                        unitOptions.find((unit) => unit.value === item.unit)
                          .label
                      }`}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-medium mb-2"> Cantidad</p>
              <div className="flex items-center">
                <InputNumber
                  value={materialQuantity}
                  min={0}
                  max={existingQuantity}
                  placeholder="Cantidad"
                  onChange={(value) => setMaterialQuantity(value)}
                  className="w-full max-w-[50%]"
                />
                <p className="ml-5 text-red-70">
                  {" "}
                  Restante:{" "}
                  {isSaved || !consumptionMaterialFromList
                    ? existingQuantity - materialQuantity
                    : existingQuantity -
                      consumptionMaterialFromList?.quantity -
                      materialQuantity}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium mb-2"> Precio de venta</p>
              <div className="flex items-center">
                <InputNumber
                  value={sellPrice}
                  placeholder="Precio"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  onChange={(value) => setSellPrice(value)}
                  className="w-full max-w-[200px]"
                  min={0}
                />
              </div>
            </div>
            <Button
              type="primary"
              onClick={() => {
                let newStorageMaterial = storageMaterials.find((item) => {
                  return item._id === addedMaterial;
                });
                newStorageMaterial = {
                  quantity: materialQuantity,
                  storage_material: { ...newStorageMaterial },
                  price: price,
                  sell_price: sellPrice,
                };

                let newMaterials = [...consumedMaterials, newStorageMaterial];

                const combinedMaterials = newMaterials.reduce((acc, item) => {
                  const existing = acc.find(
                    (entry) =>
                      entry.storage_material._id === item.storage_material._id
                  );

                  if (existing) {
                    existing.quantity += item.quantity;
                  } else {
                    acc.push({ ...item });
                  }

                  return acc;
                }, []);

                setConsumedMaterials(combinedMaterials);
                setShowSaveMaterials(true);
                setIsSaved(false);
                setMaterialQuantity(null);
              }}
              disabled={!addedMaterial || !materialQuantity}
            >
              Agregar
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto bg-gray-200 p-4 rounded-lg ">
        {consumedMaterials.length > 0 ? (
          consumedMaterials.map((item, index) => {
            return (
              <div className="flex flex-col">
                <div className="flex items-baseline" key={index}>
                  <div className="flex flex-col">
                    <p className="text-gray-700 text-sm font-medium">{`${item?.storage_material?.name} (${item?.storage_material?.reference})`}</p>{" "}
                    <p>{`${formatToCurrency(
                      item?.storage_material?.price
                    )}`}</p>
                    <p className="text-green-600 ">
                      +{Math.abs(item.price - item.sell_price)}
                    </p>
                    <p className="font-medium ">x{item?.quantity}</p>
                  </div>
                  <div className="flex-grow border-b-2 border-blue-800 border-dotted h-5 mx-2" />
                  <p className="text-base">{`${formatToCurrency(
                    item?.sell_price * item?.quantity
                  )}`}</p>
                  {isEditing && (
                    <DeleteOutlined
                      className="pl-4 p-0 ml-auto p-4 cursor-pointer hover:text-blue-800 "
                      onClick={() => {
                        setShowSaveMaterials(true);
                        // Remove the material from the consumedMaterials list
                        const updatedMaterials = consumedMaterials.filter(
                          (i) =>
                            i.storage_material._id !== item.storage_material._id
                        );

                        // Update the consumed materials
                        setConsumedMaterials(updatedMaterials);

                        // Reset material quantity and the corresponding consumption material for accurate 'Restante'
                        setMaterialQuantity(null);
                        setConsumptionMaterialFromList(null);

                        // Set the remaining quantity to the original existing quantity
                        setExistingQuantity(existingQuantity);
                      }}
                    />
                  )}
                </div>
                <Divider className="bg-gray-300 mt-4 mb-0 h-[2px] " />
              </div>
            );
          })
        ) : (
          <p>Sin materiales</p>
        )}
      </div>

      <div className="flex mt-4 flex-col">
        <div className="flex flex-row">
          <p className="text-gray-700 text-lg font-medium">Total:</p>
          <p className="ml-auto text-lg text-blue-800 font-medium">{`${formatToCurrency(
            consumedMaterials
              .map((item) => item?.sell_price * item?.quantity)
              .reduce((a, b) => a + b, 0) +
              consumedColors
                .map((item) => item?.price)
                .reduce((a, b) => a + b, 0)
          )}`}</p>
        </div>
        <div className="flex flex-row">
          <p className="text-gray-700 text-md font-medium">Margen:</p>
          <p className="ml-auto text-md text-green-500 font-medium">{`${formatToCurrency(
            consumedMaterials
              .map(
                (item) =>
                  Math.abs(item.sell_price - item.price) * item?.quantity
              )
              .reduce((a, b) => a + b, 0) +
              consumedColors
                .map((item) => item?.price)
                .reduce((a, b) => a + b, 0)
          )}`}</p>
        </div>
      </div>
    </>
  );
}

export default ConsumedMaterials;
