import React from "react";
import { Button, Modal } from "antd";

const DeleteModal = ({ open, onCancel, onDelete, message }) => {
  const handlDelete = async () => {
    try {
      onDelete();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      className="w-fit"
      width={460}
      closeIcon={false}
      footer={[
        <Button
          key="delete"
          danger
          onClick={() => {
            handlDelete();
          }}
        >
          Delete
        </Button>,
        <Button key="cancel" onClick={() => onCancel()}>
          Cancel
        </Button>,
      ]}
    >
      <h6 className=" font-default text-lg font-semibold">{message}</h6>
    </Modal>
  );
};

export default DeleteModal;
