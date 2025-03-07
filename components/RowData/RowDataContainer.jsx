import React from "react";

const RowDataContainer = ({ children, className }) => {
  return <div className={` ${className}`}>{children}</div>;
};

export default RowDataContainer;
