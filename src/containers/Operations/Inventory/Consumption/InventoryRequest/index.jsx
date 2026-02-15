import { useSelector } from "react-redux";

import RequestMaterialForm from "../../../../../components/operations/Inventory/RequestMaterialForm";

function InventoryRequest({ owner }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <h1 className="pl-6 pt-6 text-2xl text-red-700 font-semibold mb-5 ">
        Solicitar materiales
      </h1>
      <RequestMaterialForm owner={owner} />
    </>
  );
}

export default InventoryRequest;
