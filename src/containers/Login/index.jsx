import Login from "../../components/Login";
import Logo from "../../assets/images/autoexpresslogo.png";

function loginContainer() {
  return (
    <div className="login-container">
      <div className="p-4 container bg-gray-100 py-20 rounded-lg flex flex-col md:flex-row justify-center items-center">
        <div className="flex flex-col text-right text-blue-800 font-bold font-sans">
          <h1 className="">M&L</h1>
          <h1 className="">Autocheck</h1>
        </div>
        <div className="w-full md:w-1/2 md:ml-10 my-auto text-center md:text-left">
          <h1 className="mb-5 text-2xl font-bold">Iniciar sesión</h1>
          <Login />
        </div>
      </div>
    </div>
  );
}
export default loginContainer;
