import { Modal } from "antd";
import "./style.css";
/**
 * @param {{ setOpen?: () => void, open: boolean, type?: string, title?: string, content?: any }} props
 */
function ServiceModal({ open, setOpen, type, title, content }) {
  return (
    <Modal
      title={null}
      footer={null}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <h1 className="service-modal-title">{title}</h1>
      <div className="service-modal-content"> {content} </div>
    </Modal>
  );
}
export default ServiceModal;
