import { Button, Input } from "antd";
import _debounce from "lodash/debounce";
import "./style.css";
/**
 * @param {{ onSearch?: () => void }} props
 */
function TableActions({ onSearch }) {
  const handleSearch = _debounce((value) => {
    onSearch(value);
  }, 300);
  return (
    <div className="table-actions">
      <div className="search-input">
        <Input
          placeholder="Buscar..."
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
