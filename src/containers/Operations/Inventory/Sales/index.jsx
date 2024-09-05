import SalesTable from "../../../../components/operations/Inventory/SalesTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMaterials from "../../../../hooks/useInventory";

function SalesInventoryContainer({ refresh, searchValue }) {
  const { sales, getSales, loading, count } = useMaterials();
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    if (searchValue && searchValue.length) {
      getSales(1, 10, `&archived=false&customer_name=${searchValue}`);
    } else {
      getSales(1, 10, `&archived=false`);
    }
  }, [user, refresh, searchValue]);

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    getSales(pagination.current, pagination.pageSize, `&archived=false`);
  }, [pagination.current, pagination.pageSize, user]);

  const handleSearch = (value) => {
    setSearchValue(value);
    getSales(
      pagination.current,
      pagination.pageSize,
      `&archived=false&plate=${value}`
    );
  };

  const handleApplyFilters = (values) => {
    getSales(
      pagination.current,
      pagination.pageSize,
      `&archived=false${
        searchValue ? "&plate=" + searchValue : ""
      }${getFilterString(values)}`
    );
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <SalesTable
        data={sales}
        getMaterials={getSales}
        loading={loading}
        setPagination={setPagination}
        pagination={pagination}
      />
    </div>
  );
}
export default SalesInventoryContainer;
