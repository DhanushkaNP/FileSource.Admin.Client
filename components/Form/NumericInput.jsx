import React from "react";
import { Input } from "antd";

const NumericInput = ({ value = "", onChange, ...rest }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    onChange(numericValue);
  };

  return <Input value={value} onChange={handleChange} {...rest} />;
};

export default NumericInput;
