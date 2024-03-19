import { Button, Input } from "antd";
import "./style.css";
function TableActions() {
  return (
    <div className="table-actions">
      <div className="search-input">
        <Input placeholder="Buscar..." />
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
