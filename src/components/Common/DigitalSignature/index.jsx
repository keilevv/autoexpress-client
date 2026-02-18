import { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "antd";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { FaTimes } from "react-icons/fa";

function DigitalSignature({
  onSave = () => {},
  onClear = () => {},
  onEnd = () => {},
  onCancel = () => {},
}) {
  const sigCanvas = useRef({});
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 200 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Only update if dimensions actually changed and are valid
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        } else if (width > 0 && dimensions.height === 200) {
          // If height is 0 (auto), use a default aspect ratio or fixed height
          setDimensions({ width, height: 200 });
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [dimensions.height]);

  const clear = () => {
    sigCanvas.current.clear();
    onClear();
  };

  const save = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      onSave(sigCanvas.current.getCanvas().toDataURL("image/png"));
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <div
        ref={containerRef}
        className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] w-full flex-grow min-h-[200px]"
      >
        <SignatureCanvas
          ref={sigCanvas}
          penColor="#000000"
          canvasProps={{
            width: dimensions.width,
            height: dimensions.height,
            className: "signature-canvas",
          }}
          onEnd={onEnd}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={clear}
          className="flex items-center gap-1"
        >
          Limpiar firma
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={save}
          className="flex items-center gap-1 bg-red-700 hover:bg-red-800"
        >
          Guardar firma
        </Button>
        <Button
          type="text"
          icon={<FaTimes />}
          onClick={onCancel}
          className="flex items-center gap-1"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default DigitalSignature;
