import React from "react";
import { Input } from "antd";

const NumberInput = (props) => {
  const handleInputChange = (e) => {
    // Remove non-numeric characters
    const inputValue = e.target.value.replace(/\D/g, "");

    // Limit to 10 digits
    const truncatedValue = inputValue.slice(0, 10);

    // Update the input value
    if (props.onChange) {
      props.onChange({
        ...e,
        target: {
          ...e.target,
          value: truncatedValue,
        },
      });
    }
  };

  return <Input type="text" {...props} onChange={handleInputChange} />;
};

export default NumberInput;
