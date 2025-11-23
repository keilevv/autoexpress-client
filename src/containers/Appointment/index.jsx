import { headerItems } from "../Landing/landing.config";
import { Layout, Menu } from "antd";
import AgendaContent from "../../components/Landing/Agenda/AgendaContent";
import { useNavigate } from "react-router-dom";

const { Header, Footer, Content } = Layout;

function AppointmentContainer() {
  const navigate = useNavigate();
  return (
    <Layout className="min-h-[100vh]">
      <Header style={{ background: "#242424" }} className="px-4">
        <Menu
          style={{ backgroundColor: "#242424" }}
          theme="dark"
          mode="horizontal"
          items={[{ key: "home", label: "Inicio" }]}
          defaultSelectedKeys={["home"]}
          onClick={(item) => {
            if (item.key === "home") {
              navigate("/");
            }
          }}
        />
      </Header>
      <Content>
        <div className="container px-4 py-10 max-w-[900px] mx-auto">
          <AgendaContent />
        </div>
      </Content>
      <Footer
        style={{ textAlign: "center", background: "#242424", color: "white" }}
      >
        Autoexpress© 2024. All rights reserved
      </Footer>
    </Layout>
  );
}
export default AppointmentContainer;
