import { useEffect, useState } from "react";
import { Input, InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { formatToCurrency } from "../../../../../../helpers";

function ConsumedColors({
  isEditing = false,
  consumedColors = [],
  setConsumedColors,
  setShowSaveMaterials = () => {},
  owner = "autocheck",
}) {
  const [addedColor, setAddedColor] = useState(null);
  const [colorQuantity, setColorQuantity] = useState(null);
  const [colorPrice, setColorPrice] = useState(null);
  return (
    <>
      {owner === "autocheck" && (
        <div>
          <p className="text-lg font-medium mb-4 text-blue-800 mt-4">Colores</p>
          {isEditing && (
            <div className="mt-4 mb-8">
              <p className="text-sm font-medium mb-4 ">Agregar Color</p>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Nombre"
                  onChange={(e) => setAddedColor(e.target.value)}
                />
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium mb-2"> Cantidad (gl)</p>
                    <InputNumber
                      value={colorQuantity}
                      min={0}
                      placeholder="Cantidad"
                      onChange={(value) => setColorQuantity(value)}
                      className="w-full max-w-[200px]"
                    />
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
                      min={0}
                    />
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={() => {
                    setConsumedColors((prev) => {
                      return prev
                        .filter((item) => item.name !== addedColor)
                        .concat({
                          name: addedColor,
                          quantity: colorQuantity,
                          price: colorPrice,
                        });
                    });
                    setShowSaveMaterials((prev) => {
                      return { ...prev, materials: true };
                    });
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
                      <p>{`${item?.quantity} (gl)`}</p>
                    </div>
                    <div className="flex-grow border-b-2 border-blue-800 border-dotted h-5 mx-2" />
                    <p className="text-base ">{`${formatToCurrency(
                      item?.price
                    )}`}</p>
                    {isEditing && (
                      <DeleteOutlined
                        className="pl-4 p-0 ml-auto p-4 cursor-pointer hover:text-blue-800 "
                        onClick={() => {
                          setShowSaveMaterials((prev) => {
                            return { ...prev, materials: true };
                          });
                          setConsumedColors(
                            consumedColors.filter((i) => i.name !== item.name)
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
    </>
  );
}

export default ConsumedColors;
