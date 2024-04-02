import { Button, Input } from "antd";
import _debounce from "lodash/debounce";
import "./style.css";
/**
 * @param {{ onSearch?: () => string, type?: string }} props
 */
function TableActions({ onSearch, type }) {
  function getSearchPlaceholder() {
    if (type === "clients") {
      return "Buscar por nombre...";
    }
    if (type === "cars") {
      return "Buscar por placa...";
    }
    return "Buscar...";
  }
  const searchPlaceholder = getSearchPlaceholder();
  
  const handleSearch = _debounce((value) => {
    onSearch(value);
  }, 300);

  return (
    <div className="table-actions">
      <div className="search-input">
        <Input
          placeholder={searchPlaceholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div className="action-buttons">
        <Button shape="circle" className="filter-button">
          <i className="fa-solid fa-filter"></i>
        </Button>
      </div>
    </div>
  );
}

export default TableActions;
