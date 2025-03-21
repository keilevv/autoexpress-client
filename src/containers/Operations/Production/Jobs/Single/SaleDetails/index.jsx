import { InputNumber } from "antd";
import { useState, useEffect } from "react";
import { formatToCurrency } from "../../../../../../helpers";
function SaleDetails({
  jobOrder,
  setShowSaveSale,
  isEditing = false,
  setSellPrice,
  sellPrice,
}) {
  const consumed_materials = jobOrder?.consumed_materials;
  const cost = jobOrder?.consumed_materials?.reduce(
    (a, b) => a + b?.price * b?.quantity,
    0
  );
  let materialsProfit = 0;
  if (consumed_materials?.length > 0) {
    consumed_materials.forEach((material) => {
      materialsProfit +=
        (material.sell_price - material.price) * material.quantity;
    });
  }
  const sellProfit =
    sellPrice -
    (cost + (materialsProfit > 0 ? materialsProfit : -materialsProfit));

  useEffect(() => {
    if (jobOrder?.sell_price) {
      setSellPrice(jobOrder?.sell_price);
    }
  }, [jobOrder]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-baseline w-full">
        <div className="flex flex-col text-base font-semibold ">Costo</div>
        <div className="flex-grow border-b-2 border-blue-800 border-dotted h-5 mx-2"></div>{" "}
        <p className="text-base font-semibold">{formatToCurrency(cost)}</p>
      </div>
      <div className="flex items-baseline w-full">
        <div className="flex flex-col text-base font-semibold ">
          Utilidad de materiales
        </div>
        <div className="flex-grow border-b-2 border-blue-800 border-dotted h-5 mx-2"></div>{" "}
        <p
          className={`text-base font-semibold ${
            materialsProfit > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatToCurrency(materialsProfit)}
        </p>
      </div>
      <div className="flex items-baseline w-full">
        <div className="flex flex-col text-base font-semibold ">
          Utilidad de venta
        </div>
        <div className="flex-grow border-b-2 border-blue-800 border-dotted h-5 mx-2"></div>{" "}
        <p
          className={`text-base font-semibold ${
            sellProfit > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatToCurrency(sellProfit)}
        </p>
      </div>
      {isEditing ? (
        <InputNumber
          min={0}
          value={sellPrice}
          placeholder="Precio de venta"
          formatter={(value) => `${formatToCurrency(value)}`}
          onChange={(value) => {
            setSellPrice(value);
            setShowSaveSale((prev) => {
              return { ...prev, sale: true };
            });
          }}
          className="w-full max-w-[50%] mb-2"
        />
      ) : (
        <div className="flex items-baseline w-full">
          <div className="flex flex-col text-base font-semibold ">
            Precio total de venta
          </div>
          <div className="flex-grow border-b-2 border-blue-800 border-dotted h-5 mx-2"></div>{" "}
          <p className="text-base text-blue-800 font-semibold">
            {formatToCurrency(jobOrder?.sell_price)}
          </p>
        </div>
      )}
    </div>
  );
}

export default SaleDetails;
