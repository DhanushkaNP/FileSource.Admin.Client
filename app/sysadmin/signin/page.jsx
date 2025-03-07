"use client";
import FormContainer from "@/components/Form/FormContainer";
import FormTitle from "@/components/Form/FormTitle";
import { Button, Form, Alert } from "antd";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import Password from "antd/es/input/Password";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { useIsAuth } from "@/utils/Auth/auth-selectors";
import { useLogIn, useLogout } from "@/utils/Auth/auth-actions";
import { decodeToken } from "@/utils/Auth/auth-util";
import { getErrorMessage } from "@/utils/error-util";

const SignIn = () => {
  const isAuthenticated = useIsAuth();
  const login = useLogIn();

  const [form] = Form.useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/sysadmin/portal/users");
    }
  }, [isAuthenticated]);

  const onFinish = async (values) => {
    console.log("Received values:", values);
    setErrorMessage(null);

    let response;
    try {
      response = await api.post("/Admin/Login", { ...values });
    } catch (error) {
      console.log(error);

      const errorMessage = getErrorMessage(error.response);
      setErrorMessage(errorMessage.message);
      return;
    }

    console.log(`response ${JSON.stringify(response)}`);
    const token = decodeToken(response.token);
    console.log(Date.parse(token.exp));

    login(response.token, response.userId, token.exp);
    // router.push("home");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormContainer>
      <Form
        className=" bg-white p-4 rounded-md font-default px-6 w-3/12 shadow-md"
        name="signInForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        form={form}
      >
        <FormTitle
          description={"Enter your email and password to sign in!"}
          title={"CareerMate"}
          subTitle={"SysAdmin"}
        />
        <FormItem
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Email
            </span>
          }
          name={"email"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            className="font-default font-normal text-dark-dark-blue"
            placeholder="Email"
            allowClear
          />
        </FormItem>

        <FormItem
          label={
            <span className="font-default text-dark-dark-blue font-bold">
              Password
            </span>
          }
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "8 characters required" },
          ]}
        >
          <Password className="font-default" placeholder="password" />
        </FormItem>

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            closable
            className="mb-3"
          />
        )}

        <FormItem className=" mb-2">
          <Button
            type="primary"
            htmlType="submit"
            className=" bg-light-blue font-bold font-default"
            block={true}
          >
            Sign In
          </Button>
        </FormItem>

        <FormItem className="font-default text-dark-dark-blue mb-0">
          <div className="flex">
            {/* <p className="font-default pr-1">Forgot Password?</p> */}
            {/* <Link
              href={"/forgot-password"}
              className="font-default text-light-blue"
            >
              Click here
            </Link> */}
          </div>
        </FormItem>
      </Form>
    </FormContainer>
  );
};

export default SignIn;
