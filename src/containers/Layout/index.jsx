import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Dropdown } from "antd";
/* Custom hooks*/
import useMenu from "../../hooks/useMenu";
import useAuth from "../../hooks/useAuth";
import useViewport from "../../hooks/useViewport";
import { headerModules } from "../../helpers/constants";
import "./style.css";

const { Header, Content, Footer, Sider } = Layout;

function MainLayout({ children, defaultLocation = "" }) {
  const { isMobileScreen } = useViewport();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const { items } = useMenu();
  const [collapsed, setCollapsed] = useState(false);
  const [userHeaderProps, setUserHeaderProps] = useState({});
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const headerItems = [
    { key: "operations", label: "Operaciones" },
    { key: "agenda", label: "Agenda" },
    { key: "billing", label: "Facturacion" },
  ];

  const userItems = [
    { key: "user-settings", label: "Opciones de usuario" },
    {
      key: "logout",
      label: (
        <Link
          onClick={() => {
            logoutUser();
          }}
          to={"/login"}
        >
          Cerrar sesion
        </Link>
      ),
    },
  ];
  const userMenuProps = {
    items: userItems,
  };

  useEffect(() => {
    if (isMobileScreen) {
      setUserHeaderProps({ type: "text" });
      return;
    }
    setUserHeaderProps({ type: "default" });
  }, [isMobileScreen]);

  return (
    <Layout className="operations-layout">
      <Sider
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={isMobileScreen ? 45 : 80}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          style={{ backgroundColor: "#242424" }}
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={[defaultLocation]}
          onClick={(value) => {
            headerModules.forEach((module) => {
              if (window.location.pathname.includes(module)) {
                if (value.key === module) {
                  navigate(`/${module}`);
                } else {
                  navigate(`/${module}/${value.key}`);
                }
              }
            });
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Menu
            selectedKeys={[defaultLocation]}
            mode="horizontal"
            items={headerItems}
            style={{ flex: 1, minWidth: 0 }}
            onClick={(value) => {
              navigate(`/${value.key}`);
            }}
          />
          <Dropdown menu={userMenuProps} trigger={"click"}>
            <Button
              {...userHeaderProps}
              shape="circle"
              size="large"
              style={{ margin: "auto", marginRight: "15px" }}
            >
              <UserOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Autoexpress S.A.S ©2023 Created by keilev.
        </Footer>
      </Layout>
    </Layout>
  );
}
export default MainLayout;
