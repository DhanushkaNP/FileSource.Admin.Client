"use client";

import React, { useEffect, useState } from "react";
import { Form, Modal, Alert, Button } from "antd";
import FormTitle from "./FormTitle";
import { getErrorMessage } from "@/utils/error-util";

const UpdateFormModal = ({
  open,
  onCancel,
  onUpdate,
  title,
  width,
  initialValues,
  children,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState();

  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const handlUpdate = async () => {
    form.validateFields().then(async (values) => {
      try {
        console.log(values);
        await onUpdate(values);
      } catch (error) {
        console.log(error.response);
        const errorMessage = getErrorMessage(error.response);
        setError(errorMessage.message);
        return;
      }
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      className="w-fit"
      width={width}
      closeIcon={false}
      footer={[
        <Button key="update" type="primary" onClick={handlUpdate}>
          Update
        </Button>,
        <Button key="cancel" onClick={() => onCancel()}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="horizontal"
        form={form}
      >
        <FormTitle title={title} />
        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            closable
            className="mb-4"
          />
        )}
        {children}
      </Form>
    </Modal>
  );
};

export default UpdateFormModal;
