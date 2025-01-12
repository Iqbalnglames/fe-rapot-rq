import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../assets/Pages/authPage";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsRegister } = useContext(AuthContext);

  const handleLogin = async (eve) => {
    eve.preventDefault();

    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);

    await axios
      .post("https://rapot.api.techbatchtech.my.id/api/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        let path = "https://rapot.techbatchtech.my.id";
        location.href = new URL("/", path).href;
        setIsLoading(false);
        localStorage.setItem("token", res.data.access_token);
      })
      .catch((error) => {
        setMessage(error.response.data);
        setIsLoading(false);
      });
  };

  return (
    <div className="border rounded border-slate-200 drop-shadow-lg p-4 z-10 bg-white absolute top-[30%] left-1 lg:left-[40%] w-96">
      <h1 className="text-center">
        <img
          className="inline mr-2"
          width={50}
          src="https://raudhatulquran.com/wp-content/uploads/2023/08/LOGO-RQ-e1692688413673.png"
        />
        <h1 className="inline">Ahlan Wa Sahlan di Sirapot RQ</h1>
      </h1>
      <h1 className="text-center">Login untuk mengakses Sirapot</h1>
      {message.message && (
        <div className="p-2 bg-red-300 text-red-700 text-center border border-red-700">
          <h1>{message.message}</h1>
        </div>
      )}
      <form onSubmit={handleLogin} className="flex flex-col">
        <div className="flex flex-col mb-2">
          <label htmlFor="username">Username</label>
          <input
            className="border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 py-2"
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="username"
          />
          {message.username && (
            <div className="p-2 bg-red-300 text-red-700 text-center border border-red-700">
              <h1>{message.username[0]}</h1>
            </div>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="password">Password</label>
          <input
            className="border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 py-2"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="******"
          />
          {message.password && (
            <div className="p-2 bg-red-300 text-red-700 text-center border border-red-700">
              <h1>{message.password[0]}</h1>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#9e0000] rounded p-2 hover:bg-[#9e0000ec] text-white"
        >
          {isLoading === false ? (
            "Login"
          ) : (
            <h1 className="text-center">
              <svg className="loader inline" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
              Loading...
            </h1>
          )}
        </button>
        <h1>
          belum membuat akun?{" "}
          <Link
            onClick={() => setIsRegister(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            Register
          </Link>
        </h1>
      </form>
    </div>
  );
};
