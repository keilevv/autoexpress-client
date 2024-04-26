import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
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

function MainLayout({ children }) {
  const { isMobileScreen } = useViewport();
  const { logoutUser, getUser } = useAuth();
  const navigate = useNavigate();
  const { items, defaultSelectedHeader } = useMenu();
  const [collapsed, setCollapsed] = useState(true);
  const [userHeaderProps, setUserHeaderProps] = useState({});
  const [selectedSider, setSelectedSider] = useState("");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    getUser(auth.user.id);
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const headerItems = [
    { key: "operations", label: "Operaciones" },
    // { key: "billing", label: "Facturacion" },
  ];

  const userItems = [
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
      setCollapsed(true);
      setUserHeaderProps({ type: "text" });
      return;
    }
    setUserHeaderProps({ type: "default" });
  }, [isMobileScreen]);

  const getSelectedSider = () => {
    const splitItems = window.location.pathname.split("/");
    headerModules.forEach((module) => {
      splitItems.forEach((item, index) => {
        if (module === item) {
          if (splitItems.length <= 2) {
            setSelectedSider(module);
            return;
          }
          setSelectedSider(splitItems[index + 1]);
          return;
        }
      });
    });
  };

  useEffect(() => {
    getSelectedSider();
  }, [window.location.pathname]);
  return (
    <Layout className="operations-layout">
      <Header
        className="main-layout-header"
        style={{
          background: "#242424",
          width: "100%",
          display: "flex",
        }}
      >
        <Menu
          selectedKeys={[selectedSider]}
          mode="horizontal"
          theme="dark"
          items={items}
          style={{ flex: 1, minWidth: 0, backgroundColor: "#242424" }}
          onClick={(value) => {
            setSelectedSider(value.key);
            if (value.key === "operations") {
              navigate(`/operations`, { replace: true });
            } else {
              navigate(`/operations/${value.key}`);
            }
          }}
        />
        <Dropdown menu={userMenuProps} trigger={"click"}>
          <Button
            shape="circle"
            ghost
            size="large"
            style={{ margin: "auto", marginRight: "15px", color: "white" }}
          >
            <UserOutlined />
          </Button>
        </Dropdown>
      </Header>
      <div
        className="main-layout-content"
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    </Layout>
  );
}
export default MainLayout;
