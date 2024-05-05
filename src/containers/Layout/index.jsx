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
    const splitItems = window.location.pathname
      .split("/")
      .filter((item) => item !== "");
    headerModules.forEach((module) => {
      splitItems.forEach((item, index) => {
        if (module === item) {
          if (splitItems.length <= 1) {
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
    <Layout className="max-w-none bg-inherit">
      <Header
        className="flex px-4 md:px-8 lg:px-12"
        style={{
          background: "#242424",
        }}
      >
        <div className="container flex mx-4 mt-4 md:mx-8 md:mt-8 lg:mx-12 lg:mt-10">
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
          <Dropdown menu={userMenuProps} trigger={"click"} className="m-auto">
            <Button shape="circle" ghost size="large">
              <i className="fa-solid fa-user"></i>
            </Button>
          </Dropdown>
        </div>
      </Header>
      <div className="mx-4 mt-4 md:mx-8 md:mt-8 lg:mx-12 lg:mt-10">
        <div className="container bg-white rounded-lg p-5">{children}</div>
      </div>
    </Layout>
  );
}
export default MainLayout;
