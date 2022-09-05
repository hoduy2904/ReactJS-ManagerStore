import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  message,
  Space,
  Typography,
} from "antd";
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  DownOutlined,
  BulbFilled,
  BulbOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Routes from "../../routes/routes";

const { Header, Content, Sider } = Layout;

const Index = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const [showSider, setShowSider] = useState(false);
  const [selectKeys, setSelectkeys] = useState([window.location.pathname]);
  const [isDark, setIsDark] = useState(false);

  const handleShowSider = (result) => {
    setShowSider(result);
  };

  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "1st menu item",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "2nd menu item",
          key: "2",
          icon: <UserOutlined />,
        },
        {
          label: "3rd menu item",
          key: "3",
          icon: <UserOutlined />,
        },
      ]}
    />
  );

  const items = Routes.filter((route) => route.showMenu).map((item) => {
    const ICON = item.icon;
    return getItem(
      <Link to={item.path}>{item.name}</Link>,
      item.path,
      ICON && <ICON />
    );
  });

  const selectMenu = (e) => {
    setSelectkeys([e.key]);
    showSider && setCollapsed(true);
  };

  return (
    <Layout
      hasSider
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme={isDark ? "dark" : "light"}
        breakpoint="md"
        onBreakpoint={handleShowSider}
        collapsedWidth={!showSider ? undefined : 0}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="w-12 flex m-auto py-2 border-b-2">
          <img
            alt=""
            className="w-full"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
          />
        </div>
        <Menu
          defaultSelectedKeys={["/"]}
          selectedKeys={selectKeys}
          onSelect={selectMenu}
          theme={isDark && "dark"}
          items={items}
        ></Menu>
      </Sider>
      <Layout>
        <Header
          className="shadow-md"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div className="flex justify-between">
            <div></div>
            <Space>
              <button
                onClick={() => setIsDark(!isDark)}
                style={{ fontSize: "22px" }}
              >
                {isDark ? <BulbOutlined /> : <BulbFilled />}
              </button>
              <Dropdown overlay={menu}>
                <button>
                  <Space className="leading-none">
                    <Avatar
                      size={"large"}
                      src="https://allimages.sgp1.digitaloceanspaces.com/photographercomvn/2022/06/1655140135_24_Share-60-Anh-Avatar-Cute-Hinh-Dai-Dien-De-Thuong.jpg"
                    ></Avatar>
                    <DownOutlined style={{ fontSize: "8px" }} />
                    <Space
                      className="leading-none text-left"
                      direction="vertical"
                    >
                      <b>Hồ Đức Duy</b>
                      <span className="text-gray-500">Admin</span>
                    </Space>
                  </Space>
                </button>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Content className=" bg-white m-6 p-6 rounded-md">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Index;
