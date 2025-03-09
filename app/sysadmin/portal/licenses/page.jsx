"use client";

import DeleteModal from "@/components/DeleteModal";
import CreateFormModal from "@/components/Form/CreateFormModal";
import NumericInput from "@/components/Form/NumericInput";
import { LicenseTypes } from "@/shared/constants/licenseTypes";
import api from "@/utils/api";
import { useUserToken } from "@/utils/Auth/auth-selectors";
import { Button, Form, Table, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Licenses = () => {
  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      width: "30%",
    },
    {
      title: "Created",
      dataIndex: "created",
      width: "20%",
    },
    {
      title: "Valid Till",
      dataIndex: "valid",
      width: "15%",
    },
    {
      title: "Valid Days",
      dataIndex: "days",
    },
    {
      title: "",
      render: ({ key }) => (
        <div className=" flex justify-end gap-3 pe-4">
          <Button
            danger
            onClick={() => {
              setLicenseDeleteModalDetails({ isOpen: true, licenseId: key });
            }}
          >
            Delete
          </Button>
        </div>
      ),
      width: 300,
    },
  ];

  const token = useUserToken();

  const [licenseDeleteModalDetails, setLicenseDeleteModalDetails] = useState({
    isOpen: false,
    licenseId: null,
  });

  const [licenseCreateModelOpen, setLicenseCreateModelOpen] = useState(false);

  const [licenses, setLicenses] = useState([]);
  const [userSearchKeyWord, setUserSearchKeyWord] = useState("");

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
      total: 20,
    },
  });

  const handleTableChange = (pagination, filters) => {
    setTableParams({
      pagination: {
        ...pagination,
      },
      filters,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setLicenses([]);
    }
  };

  const fetchData = async () => {
    try {
      let offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
      await api
        .get(
          "License",
          {
            limit: tableParams.pagination.pageSize,
            offset: offset,
            search: userSearchKeyWord,
          },
          token
        )
        .then((response) => {
          setLicenses(response.items);
          console.log(response);

          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.meta.count,
            },
          });
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), userSearchKeyWord]);

  const createLicense = async (values) => {
    console.log(values);
    await api.post(
      "License",
      { ...values, type: parseInt(values.type) },
      token
    );
    setLicenseCreateModelOpen(false);
    const licenseListResponse = await api.get("License", null, token);
    setLicenses(licenseListResponse.items);
  };

  const deleteLicense = async () => {
    await api.delete(`License/${licenseDeleteModalDetails.licenseId}`, token);
    const licenseListResponse = await api.get("License", null, token);
    setLicenses(licenseListResponse.items);
    setLicenseDeleteModalDetails({ isOpen: false, userId: null });
  };

  return (
    <div>
      {/* Create license modal */}
      <CreateFormModal
        open={licenseCreateModelOpen}
        onCancel={() => setLicenseCreateModelOpen(false)}
        onCreate={createLicense}
        title={"Create SysAdmin User"}
        width={"40%"}
      >
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              License Type
            </span>
          }
          name={"type"}
          rules={[
            { required: true, message: "Please input your license type!" },
          ]}
        >
          <Select placeholder="Select license type" size="middle" allowClear>
            {Object.entries(LicenseTypes).map(([key, value]) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Daily Limit
            </span>
          }
          name={"dailyLimit"}
          rules={[{ required: true, message: "Please input daily limit!" }]}
        >
          <NumericInput placeholder="30" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Valid Days
            </span>
          }
          name={"validDays"}
          rules={[
            {
              required: true,
              message: "Please input valid days of the license!",
            },
          ]}
        >
          <NumericInput placeholder="30" />
        </Form.Item>
      </CreateFormModal>

      <DeleteModal
        open={licenseDeleteModalDetails.isOpen}
        onCancel={() =>
          setLicenseDeleteModalDetails({ isOpen: false, licenseId: null })
        }
        onDelete={deleteLicense}
        message={"Do you want to delete the license?"}
      />

      <div className="flex justify-end">
        <Button
          type="primary"
          size="large"
          className=" flex-initial flex gap-2 bg-light-blue"
          onClick={() => setLicenseCreateModelOpen(true)}
        >
          <span>Create new license</span>
          <AiOutlinePlus className=" align-bottom h-full" size={22} />
        </Button>
      </div>

      <div className="mt-4 font-default">
        <Table
          columns={columns}
          dataSource={licenses.map((l) => {
            return {
              key: l.id,
              valid: l.validTill,
              days: l.validDays,
              created: new Date(l.createdAt).toLocaleString(),
            };
          })}
          size="middle"
          className="font-default text-md"
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default Licenses;
