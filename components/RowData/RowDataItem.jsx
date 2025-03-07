import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const RowDataItem = ({
  title,
  subtitle,
  onDeleteClickHandler,
  onEditClickHandler,
  id,
  onRowClick,
  selectedRowItemId,
}) => {
  return (
    <div
      className={`w-full h-7 drop-shadow-md border flex justify-between items-center font-medium px-2 hover:bg-light-gray ${
        id === selectedRowItemId && "bg-light-gray"
      }`}
      onClick={() => {
        onRowClick && onRowClick(id);
      }}
    >
      <div>
        <p>{title}</p>
      </div>
      <div className=" flex gap-3">
        <DeleteOutlined
          className="text-lg"
          onClick={() => onDeleteClickHandler(id, title)}
        />
        <EditOutlined
          className="text-lg"
          onClick={() => {
            onEditClickHandler(id);
          }}
        />
      </div>
    </div>
  );
};

export default RowDataItem;
