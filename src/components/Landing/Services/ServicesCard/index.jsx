import useViewPort from "../../../../hooks/useViewport";
import "./style.css";
import { useState } from "react";
function ServicesCard(props) {
  const [open, setOpen] = useState(false);
  const { type } = props;

  return (
    <div
      className={`flex flex-col bg-white p-4 cursor-pointer rounded-lg hover:shadow-lg ${
        open ? "h-[300px]" : ""
      } hover:bg-gray-200 transition-background duration-300`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-center">
        <div
          className="max-w-[100px] max-h-[100px] rounded-full flex justify-center items-center"
          style={{ background: props.color }}
        >
          <img src={props.icon} className="p-4" />
        </div>
      </div>
      <h2 className="text-xl text-red-700 my-4 text-center">{props.title}</h2>
      <div
        className={`flex justify-center transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 h-0"
        }`}
      >
        <p>{props.description}</p>
      </div>
    </div>
  );
}
export default ServicesCard;
