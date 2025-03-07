"use client";

import React, { useEffect } from "react";
import { RiAdminFill } from "react-icons/ri";
import { FaUniversity } from "react-icons/fa";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { useIsAuth } from "@/utils/Auth/auth-selectors";
import { useRouter } from "next/navigation";
import { useLogout } from "@/utils/Auth/auth-actions";

const { Sider } = Layout;

const NavMenuLayout = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useIsAuth();
  const logOut = useLogout();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sysadmin/signin");
    }
  }, [logOut]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className=" bg-dark-bg h-screen font-default">
      <div>
        <Layout hasSider className="bg-dark-bg ">
          <Sider
            theme="light"
            className="shadow-md w-1/2 h-screen"
            width={240}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <div className=" align-middle text-center font-bold text-xl my-2 border-b-2">
              <Link
                className=" font-inika text-dark-blue my-2 hover:text-dark-blue "
                href={"/sysadmin/portal/users"}
              >
                FileSource Admin
              </Link>
            </div>

            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: 1,
                  icon: <RiAdminFill size={20} className=" fill-dark-blue" />,
                  label: (
                    <Link
                      href={"users"}
                      className="font-default fill-dark-blue "
                    >
                      SysAdmin users
                    </Link>
                  ),
                  style: { color: "black" },
                },
                {
                  key: 2,
                  icon: <FaUniversity size={20} className=" fill-dark-blue" />,
                  label: (
                    <Link
                      href={"universities"}
                      className="font-default fill-dark-blue"
                    >
                      License
                    </Link>
                  ),
                },
              ]}
            />
            <div className="text-center mb-4 absolute bottom-0 mx-auto w-full">
              <Button
                type="primary"
                ghost
                className=" px-20 font-medium"
                onClick={() => logOut()}
              >
                Sign out
              </Button>
            </div>
          </Sider>
          <Layout className="bg-dark-bg ms-64 me-4 pt-10">{children}</Layout>
        </Layout>
      </div>
    </div>
  );
};

export default NavMenuLayout;
