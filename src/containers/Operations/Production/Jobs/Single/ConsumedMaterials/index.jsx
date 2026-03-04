import { useEffect, useCallback, useState } from "react";
import _debounce from "lodash/debounce";
import { formatToCurrency } from "../../../../../../helpers";
import { DeleteOutlined } from "@ant-design/icons";
import { Select, InputNumber, Button, Input } from "antd";
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
  owner = "autoexpress",
}) {
  const {
    getConsumptionMaterials,
    consumptionMaterials,
    loading,
    getConsumptionColors,
    consumptionColors,
  } = useInventory();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [addedMaterial, setAddedMaterial] = useState(null);
  const [addedColor, setAddedColor] = useState(null);
  const [colorQuantity, setColorQuantity] = useState(null);
  const [colorPrice, setColorPrice] = useState(null);
  const [materialQuantity, setMaterialQuantity] = useState(null);
  const [existingQuantity, setExistingQuantity] = useState(0);
  const [existingColorQuantity, setExistingColorQuantity] = useState(0);
  const [consumptionMaterialFromList, setConsumptionMaterialFromList] =
    useState(null);

  const [consumptionColorFromList, setConsumptionColorFromList] =
    useState(null);
  const [colorSearchValue, setColorSearchValue] = useState("");

  useEffect(() => {
    if (consumedMaterials.length && addedMaterial) {
      const materialFound = consumedMaterials.find(
        (item) => item.consumption_material._id === addedMaterial,
      );
      setConsumptionMaterialFromList(materialFound);
    }
  }, [addedMaterial, consumedMaterials]);

  useEffect(() => {
    if (consumedColors.length && addedColor) {
      const colorFound = consumedColors.find(
        (item) => item.consumption_material?._id === addedColor,
      );
      setConsumptionColorFromList(colorFound);
    }
  }, [addedColor, consumedColors]);

  useEffect(() => {
    if (isEditing) {
      getConsumptionMaterials(
        1,
        10,
        `&archived=false&owner=${owner}&is_color=false`,
      );
      getConsumptionColors(1, 10, `&archived=false&owner=${owner}`);
    }
  }, [isEditing]);

  const handleSearchMaterial = (value) => {
    getConsumptionMaterials(
      1,
      10,
      `&archived=false&owner=${owner}&search=${value}&is_color=false`,
    );
  };

  const handleSearchColor = (value) => {
    getConsumptionColors(
      1,
      10,
      `&archived=false&owner=${owner}&search=${value}`,
    );
  };

  useEffect(() => {
    if (materialQuantity < 0) setMaterialQuantity(null);
  }, [materialQuantity]);

  const debounceFn = useCallback(_debounce(handleSearchMaterial, 300), []);
  const debounceFnColor = useCallback(_debounce(handleSearchColor, 300), []);

  return (
    <>
      <p className="text-lg font-medium mb-4 text-red-700">Materiales</p>
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
                  const newSelectedMaterial = consumptionMaterials.find(
                    (item) => item._id === value,
                  );
                  setSelectedMaterial(newSelectedMaterial);
                  setExistingQuantity(newSelectedMaterial.quantity);
                  setAddedMaterial(value);
                }}
                allowClear
                onClear={() => setAddedMaterial(null)}
              >
                {consumptionMaterials.map((item) => {
                  return (
                    <Select.Option
                      key={item._id}
                      value={item._id}
                      label={item.material.name}
                    >
                      {`${item.material.name} - ${item.material.reference}`}
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
                  Disponible:{" "}
                  {isSaved || !consumptionMaterialFromList
                    ? Number(
                        Number(existingQuantity - materialQuantity).toFixed(3),
                      )
                    : Number(
                        Number(existingQuantity) -
                          Number(consumptionMaterialFromList?.quantity) -
                          Number(materialQuantity),
                      ).toFixed(3)}
                </p>
              </div>
            </div>
            <Button
              type="primary"
              onClick={() => {
                let newConsumedMaterial = consumptionMaterials.find((item) => {
                  return item._id === addedMaterial;
                });
                newConsumedMaterial = {
                  consumption_material: {
                    ...newConsumedMaterial,
                    material: newConsumedMaterial.material._id,
                  },
                  quantity: materialQuantity,
                  storage_material: { ...newConsumedMaterial.material },
                };

                let newMaterials = [...consumedMaterials, newConsumedMaterial];

                const combinedMaterials = newMaterials.reduce((acc, item) => {
                  const existing = acc.find(
                    (entry) =>
                      entry.consumption_material._id ===
                      item.consumption_material._id,
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
      <div className="flex flex-col gap-4 max-h-[200px] overflow-y-auto bg-gray-200 p-4 rounded-lg ">
        {consumedMaterials.length > 0 ? (
          consumedMaterials.map((item, index) => {
            return (
              <div className="flex items-baseline " key={index}>
                <div>
                  <p className="text-gray-700 text-sm font-medium">{`${item?.storage_material?.name} (${item?.storage_material?.reference})`}</p>{" "}
                  <p>{`${formatToCurrency(item?.storage_material?.price)} x ${
                    item?.quantity
                  }`}</p>
                </div>
                <div className="flex-grow border-b-2 border-red-700 border-dotted h-5 mx-2" />
                <p className="text-base ">{`${formatToCurrency(
                  item?.storage_material?.price * item?.quantity,
                )}`}</p>
                {isEditing && (
                  <DeleteOutlined
                    className="pl-4 p-0 ml-auto p-4 cursor-pointer hover:text-red-700 "
                    onClick={() => {
                      setShowSaveMaterials(true);
                      // Remove the material from the consumedMaterials list
                      const updatedMaterials = consumedMaterials.filter(
                        (i) =>
                          i.consumption_material._id !==
                          item.consumption_material._id,
                      );

                      // Update the consumed materials
                      setConsumedMaterials(updatedMaterials);

                      // Reset material quantity and the corresponding consumption material for accurate 'Disponible'
                      setMaterialQuantity(null);
                      setConsumptionMaterialFromList(null);

                      // Set the remaining quantity to the original existing quantity
                      setExistingQuantity(existingQuantity);
                    }}
                  />
                )}
              </div>
            );
          })
        ) : (
          <p>Sin materiales</p>
        )}
      </div>
      {owner === "autoexpress" && (
        <div>
          <p className="text-base font-medium mb-4 text-red-700 mt-4">
            Colores
          </p>
          {isEditing && (
            <div className="mt-4 mb-8">
              <p className="text-sm font-medium mb-4 ">Agregar Color</p>
              <div className="flex flex-col gap-4">
                <Select
                  loading={loading}
                  className="w-full"
                  value={addedColor}
                  showSearch
                  placeholder="Buscar..."
                  optionLabelProp="label"
                  optionFilterProp="children"
                  onSearch={(value) => {
                    setSelectedColor(null);
                    setColorSearchValue(value);
                    debounceFnColor(value);
                  }}
                  onSelect={(value) => {
                    const newSelectedColor = consumptionColors.find(
                      (item) => item._id === value,
                    );
                    if (newSelectedColor) {
                      const existingColorQuantity =
                        newSelectedColor.material.normalized_weight *
                        newSelectedColor.quantity;
                      setSelectedColor(newSelectedColor);
                      setAddedColor(value);
                      setExistingColorQuantity(existingColorQuantity);
                      setColorSearchValue("");
                    }
                  }}
                  onBlur={() => {
                    if (colorSearchValue) {
                      setAddedColor(colorSearchValue);
                    }
                  }}
                  onChange={(value) => {
                    if (!value) {
                      setAddedColor(null);
                      setColorSearchValue("");
                      setExistingColorQuantity(0);
                    }
                  }}
                  allowClear
                  onClear={() => {
                    setAddedColor(null);
                    setColorSearchValue("");
                    setExistingColorQuantity(0);
                  }}
                >
                  {consumptionColors.map((item) => {
                    return (
                      <Select.Option
                        key={item._id}
                        value={item._id}
                        label={item.material.name}
                      >
                        {`${item.material.name} - ${item.material.reference}`}
                      </Select.Option>
                    );
                  })}
                </Select>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium mb-2"> Cantidad (gr)</p>
                    <InputNumber
                      value={colorQuantity}
                      min={0}
                      placeholder="Cantidad"
                      onChange={(value) => setColorQuantity(value)}
                      className="w-full max-w-[200px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    {selectedColor && (
                      <>
                        <p className="text-sm font-medium mb-2">
                          {" "}
                          Disponible (gr)
                        </p>
                        <p>
                          {" "}
                          {isSaved || !consumptionColorFromList
                            ? Number(
                                Number(
                                  existingColorQuantity - colorQuantity,
                                ).toFixed(3),
                              )
                            : Number(
                                Number(existingColorQuantity) -
                                  Number(consumptionColorFromList?.quantity) -
                                  Number(colorQuantity),
                              ).toFixed(3)}{" "}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium mb-2"> Precio</p>
                  <InputNumber
                    placeholder="Precio"
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    onChange={(value) => setColorPrice(value)}
                    className="w-full max-w-[200px]"
                  />
                </div>
                <Button
                  type="primary"
                  onClick={() => {
                    const colorName = selectedColor
                      ? selectedColor.material.name
                      : addedColor;
                    setConsumedColors((prev) => {
                      return prev
                        .filter((item) =>
                          selectedColor
                            ? item.consumption_material !== selectedColor._id
                            : item.name !== colorName,
                        )
                        .concat({
                          name: colorName,
                          consumption_material: selectedColor?._id,
                          quantity: colorQuantity,
                          price: colorPrice,
                        });
                    });
                    setShowSaveMaterials(true);
                    setAddedColor(null);
                    setSelectedColor(null);
                    setColorQuantity(null);
                    setColorPrice(null);
                  }}
                  disabled={!addedColor || !colorQuantity || !colorPrice}
                >
                  Agregar
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 max-h-[200px] overflow-y-auto bg-gray-200 p-4 rounded-lg ">
            {consumedColors.length > 0 ? (
              consumedColors.map((item, index) => {
                return (
                  <div className="flex items-baseline " key={index}>
                    <div>
                      <p className="text-gray-700 text-sm font-medium">{`${item?.name}`}</p>
                      <p>{`${Number(Number(item?.quantity).toFixed(3))} gr`}</p>
                    </div>
                    <div className="flex-grow border-b-2 border-red-700 border-dotted h-5 mx-2" />
                    <p className="text-base ">{`${formatToCurrency(
                      item?.price,
                    )}`}</p>
                    {isEditing && (
                      <DeleteOutlined
                        className="pl-4 p-0 ml-auto p-4 cursor-pointer hover:text-red-700 "
                        onClick={() => {
                          setShowSaveMaterials(true);
                          setConsumedColors(
                            consumedColors.filter((i) =>
                              i.consumption_material
                                ? i.consumption_material !==
                                  item.consumption_material
                                : i.name !== item.name,
                            ),
                          );
                        }}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <>
                <p>Sin colores</p>
              </>
            )}
          </div>
        </div>
      )}
      <div className="flex mt-4">
        <p className="text-gray-700 text-lg font-medium">Total:</p>
        <p className="ml-auto text-lg text-red-700 font-medium">{`${formatToCurrency(
          consumedMaterials
            .map((item) => item?.storage_material?.price * item?.quantity)
            .reduce((a, b) => a + b, 0) +
            consumedColors
              .map((item) => item?.price)
              .reduce((a, b) => a + b, 0),
        )}`}</p>
      </div>
    </>
  );
}

export default ConsumedMaterials;
