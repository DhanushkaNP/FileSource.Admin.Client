import { Button } from "antd";
import React from "react";

const RowDataHeader = ({ title, subTitle, onButtonClick }) => {
  return (
    <div className="mb-2">
      <h3 className=" font-semibold text-base">{title}</h3>
      <div className="flex justify-between">
        <h5 className=" font-normal text-sm text-light-gray">{subTitle}</h5>
        <Button
          type="primary"
          size="small"
          className="px-2"
          onClick={onButtonClick}
        >
          Add a new
        </Button>
      </div>
    </div>
  );
};

export default RowDataHeader;
