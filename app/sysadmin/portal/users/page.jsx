"use client";

import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Table, Button, Form } from "antd";
import api from "@/utils/api";
import { useUserToken } from "@/utils/Auth/auth-selectors";
import { AiOutlinePlus } from "react-icons/ai";
import CreateFormModal from "@/components/Form/CreateFormModal";
import DeleteModal from "@/components/DeleteModal";
import UpdateFormModal from "@/components/Form/UpdateFormModal";

const { Search } = Input;

const SysAdminUsers = () => {
  const columns = [
    {
      title: "Full name",
      dataIndex: "name",
      width: "16%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "18%",
    },
    {
      title: "Created",
      dataIndex: "created",
    },
    {
      title: "",
      render: ({ key }) => (
        <div className=" flex justify-end gap-3 pe-4">
          <Button
            type="primary"
            onClick={() => {
              editOnClickHandler(key);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              setUserDeleteModalDetails({ isOpen: true, userId: key });
            }}
          >
            Delete
          </Button>
        </div>
      ),
      width: 300,
    },
  ];

  const [sysAdminUsers, setSysAdminUsers] = useState([]);
  const token = useUserToken();
  const [tableLoading, setTableLoading] = useState(false);
  const [userSearchKeyWord, setUserSearchKeyWord] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10,
    },
  });

  const [isSysAdminCreateModelOpen, setSysAdminCreateModelOpen] =
    useState(false);
  const [userDeleteModalDetails, setUserDeleteModalDetails] = useState({
    isOpen: false,
    userId: null,
  });
  const [userEditModalDetails, setUserEditModalDetails] = useState({
    isOpen: false,
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
  });

  const fetchData = async () => {
    try {
      let offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
      setTableLoading(true);
      await api
        .get(
          "Admin/Users",
          {
            limit: tableParams.pagination.pageSize,
            offset: offset,
            search: userSearchKeyWord,
          },
          token
        )
        .then((response) => {
          setSysAdminUsers(response.items);
          setTableLoading(false);
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

  const handleTableChange = (pagination, filters) => {
    setTableParams({
      pagination: {
        ...pagination,
      },
      filters,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const createSysAdmin = async (values) => {
    console.log(values);
    await api.post("Admin/create", { ...values }, token);
    setSysAdminCreateModelOpen(false);
    const usersListResponse = await api.get("Admin/Users", null, token);
    setSysAdminUsers(usersListResponse.items);
  };

  const deleteSysAdmin = async () => {
    await api.delete(`Admin/${userDeleteModalDetails.userId}`, token);
    const usersListResponse = await api.get("Admin/Users", null, token);
    setSysAdminUsers(usersListResponse.items);
    setUserDeleteModalDetails({ isOpen: false, userId: null });
  };

  const updateSysAdmin = async (values) => {
    console.log(values);
    console.log(`values ${values["first-name"]}`);
    await api.put(
      `Admin/${userEditModalDetails.userId}`,
      {
        firstName: values["first-name"],
        lastName: values["last-name"],
        email: values.email,
        password: values.password,
      },
      token
    );
    const usersListResponse = await api.get("Admin/Users", null, token);
    setSysAdminUsers(usersListResponse.items);
    setUserEditModalDetails({ isOpen: false, userId: null });
  };

  const editOnClickHandler = async (id) => {
    try {
      console.log(id);
      await api.get(`/Admin/${id}`, null, token).then((response) => {
        console.log(`response ${response.firstName}`);
        setUserEditModalDetails({
          isOpen: true,
          userId: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
        });
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      {/* Create user modal */}
      <CreateFormModal
        open={isSysAdminCreateModelOpen}
        onCancel={() => setSysAdminCreateModelOpen(false)}
        onCreate={createSysAdmin}
        title={"Create SysAdmin User"}
        width={460}
      >
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              First Name
            </span>
          }
          name={"FirstName"}
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Last Name
            </span>
          }
          name={"LastName"}
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Email
            </span>
          }
          name={"Email"}
          rules={[
            { required: true, message: "Please input your E-mail!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            className="font-default font-normal text-dark-dark-blue"
            autoComplete="new-email"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Password
            </span>
          }
          name={"Password"}
          rules={[
            { required: true, message: "Please input valid Password!" },
            {
              validator: (_, value) => {
                if (value && value.length < 8) {
                  return Promise.reject(
                    "Password should have more than 8 characters!"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            className="font-default font-normal text-dark-dark-blue"
            autoComplete="new-password"
            placeholder={"Password"}
          />
        </Form.Item>
      </CreateFormModal>

      {/* Delete user modal */}
      <DeleteModal
        open={userDeleteModalDetails.isOpen}
        onCancel={() =>
          setUserDeleteModalDetails({ isOpen: false, userId: null })
        }
        onDelete={deleteSysAdmin}
        message={"Do you want to delete the user?"}
      />

      {/* Edit user modal */}
      <UpdateFormModal
        open={userEditModalDetails.isOpen}
        width={"35%"}
        onCancel={() => {
          setUserEditModalDetails({
            isOpen: false,
            userId: null,
            firstName: null,
            lastName: null,
            email: null,
          });
        }}
        onUpdate={updateSysAdmin}
        title={"Update SysAdmin User"}
        initialValues={{
          "first-name": userEditModalDetails.firstName,
          "last-name": userEditModalDetails.lastName,
          email: userEditModalDetails.email,
        }}
      >
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              First Name
            </span>
          }
          name={"first-name"}
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Last Name
            </span>
          }
          name={"last-name"}
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input className="font-default font-normal text-dark-dark-blue" />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Email
            </span>
          }
          name={"email"}
          rules={[
            { required: true, message: "Please input your E-mail!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            className="font-default font-normal text-dark-dark-blue"
            autoComplete="new-email"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              New Password
            </span>
          }
          name={"new-password"}
          rules={[
            {
              validator: (_, value) => {
                if (value && value.length < 8) {
                  return Promise.reject(
                    "Password must be exactly 8 characters!"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            className="font-default font-normal text-dark-dark-blue"
            autoComplete="new-password"
            placeholder="Password"
          />
        </Form.Item>
      </UpdateFormModal>

      <div className="flex justify-between">
        <Search
          placeholder={"Search by email or name"}
          enterButton
          className=" w-1/4 shadow-sm flex-initial"
          size="large"
          style={{ borderRadius: "0px !important" }}
          onSearch={(value) => setUserSearchKeyWord(value)}
        />
        <Button
          type="primary"
          size="large"
          className=" flex-initial flex gap-2 bg-light-blue"
          onClick={() => setSysAdminCreateModelOpen(true)}
        >
          <span>Create new User</span>
          <AiOutlinePlus className=" align-bottom h-full" size={22} />
        </Button>
      </div>

      <div className="mt-4 font-default">
        <Table
          columns={columns}
          dataSource={sysAdminUsers.map((s) => {
            return {
              key: s.id,
              name: `${s.firstName} ${s.lastName}`,
              email: s.email,
              created: new Date(s.dateCreated).toLocaleString(),
            };
          })}
          size="middle"
          className="font-default text-md"
          loading={tableLoading}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default SysAdminUsers;
