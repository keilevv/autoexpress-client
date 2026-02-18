import RequestMaterialForm from "../../../../../components/operations/Inventory/RequestMaterialForm";

function InventoryRequest({ owner }) {
  const handleRequestStorageMaterial = (payload) => {
    console.log(payload);
  };

  return (
    <>
      <h1 className="pl-4 pt-4 text-2xl text-red-700 font-medium mb-6 ">
        Solicitar materiales
      </h1>
      <RequestMaterialForm
        owner={owner}
        handleRequestStorageMaterial={handleRequestStorageMaterial}
      />
    </>
  );
}

export default InventoryRequest;
