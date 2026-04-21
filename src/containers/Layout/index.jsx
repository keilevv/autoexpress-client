import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/images/favicon.png";
import { Layout, Menu, theme, Button, Dropdown } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";

/* Custom hooks*/
import useMenu from "../../hooks/useMenu";
import useAuth from "../../hooks/useAuth";
import useViewport from "../../hooks/useViewport";
import NotificationList from "../../components/Common/NotificationList";
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
  const [owner, setOwner] = useState("autoexpress");

  useEffect(() => {
    getUser(auth.user.id);
  }, []);

  useEffect(() => {
    if (auth?.user && auth?.user?.roles) {
      if (auth.user.roles.includes("autodetailing-operator")) {
        setOwner("autodetailing");
      } else {
        setOwner("autoexpress");
      }
    }
  }, [auth]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const headerItems = [
    { key: "operations", label: "Operaciones" },
    // { key: "billing", label: "Facturacion" },
  ];

  const userItems = [
    {
      key: "settings",
      label: (
        <Link to={"/operations/settings"}>
          <SettingOutlined className="mr-2" />
          Configuración
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <Link
          onClick={() => {
            logoutUser();
          }}
          to={"/login"}
        >
          <LogoutOutlined className="mr-2" />
          Cerrar sesión
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
    const splitItems = window.location.pathname
      .split("/")
      .filter((item) => item !== "");
    headerModules.forEach((module) => {
      splitItems.forEach((item, index) => {
        if (module === item) {
          if (splitItems.length <= 1) {
            if (owner === "autodetailing") {
              setSelectedSider("production-autodetailing");
            } else {
              setSelectedSider(module);
            }
            return;
          }
          if (auth.user.roles.includes("autoexpress")) {
            setSelectedSider(splitItems[index + 1] + "-" + owner);
          } else {
            setSelectedSider(splitItems[index + 1]);
          }
          return;
        }
      });
    });
  };

  const handleMenuClick = (value) => {
    if (value.key === "settings" || value.key === "logout") return;

    switch (value.key) {
      case "operations":
        navigate(`/operations`, { replace: true });
        setSelectedSider(value.key);
        break;
      case "inventory-autoexpress":
      case "inventory-autodetailing":
        navigate(
          `/operations/inventory/${value.key.replace("inventory-", "")}`,
          { replace: true },
        );
        break;
      case "production-autoexpress":
      case "production-autodetailing":
        navigate(
          `/operations/production/${value.key.replace("production-", "")}`,
          { replace: true },
        );
        break;
      default:
        navigate(`/operations/${value.key}`, { replace: true });
    }
  };

  const dropdownItems = isMobileScreen
    ? [...items, { type: "divider" }, ...userItems]
    : userItems;

  const mainMenuProps = {
    items: dropdownItems,
    onClick: handleMenuClick,
    selectedKeys: [selectedSider],
  };

  useEffect(() => {
    getSelectedSider();
  }, [window.location.pathname, owner, auth]);

  return (
    <Layout className="max-w-none bg-inherit">
      <Header
        className="flex px-4 md:px-8 lg:px-12"
        style={{
          background: "#242424",
        }}
      >
        <div className="flex w-full m-auto items-center">
          <div className="px-4">
            <img src={Logo} className="object-cover h-10 rounded lg" />
          </div>

          {!isMobileScreen && (
            <Menu
              className="hidden md:flex"
              selectedKeys={[selectedSider]}
              mode="horizontal"
              theme="dark"
              items={items}
              style={{
                flex: 1,
                minWidth: 0,
                backgroundColor: "#242424",
                borderBottom: 0,
              }}
              onClick={handleMenuClick}
            />
          )}

          <div className="flex items-center ml-auto h-full">
            {auth?.user && (
              <span className="text-white mr-4 font-medium hidden sm:inline-block">
                {auth.user.username || auth.user.name || auth.user.email}
              </span>
            )}
            <NotificationList />
            <Dropdown menu={mainMenuProps} trigger={["hover"]} className="ml-2">
              <button className="flex items-center justify-center hover:bg-red-700 hover:text-white rounded-lg text-white text-lg p-2">
                <MenuOutlined />
              </button>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content className="bg-gray-100 w-full min-h-[calc(100vh-64px)]">
        <div className="px-4 md:px-8 lg:px-12 p-5 m-auto">{children}</div>
      </Content>
    </Layout>
  );
}
export default MainLayout;
