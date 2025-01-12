import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../assets/Pages/authPage";

export const Register = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsRegister } = useContext(AuthContext);

  const handleRegister = async (eve) => {
    eve.preventDefault();

    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    await axios
      .post("http://api.rapot.techbatchtech.my.id/api/register", formData)
      .then(() => {
        setIsLoading(false);
        alert("berhasil mendaftar");
        setIsRegister(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="border rounded border-slate-200 drop-shadow-lg p-4 z-10 bg-white absolute top-[18%] left-1 lg:left-[40%] w-96">
      <h1 className="text-center">
        <img
          className="inline mr-2"
          width={50}
          src="https://raudhatulquran.com/wp-content/uploads/2023/08/LOGO-RQ-e1692688413673.png"
        />
        <h1 className="inline">Ahlan Wa Sahlan di Sirapot RQ</h1>
      </h1>
      <h1 className="text-center">Daftar untuk mengakses Sirapot</h1>
      <h1 className="text-center">
        (setelah mendaftar harap menunggu hingga akun diaktifkan)
      </h1>
      {message.message && (
        <div className="p-2 bg-red-300 text-red-700 text-center border border-red-700">
          <h1>{message.message}</h1>
        </div>
      )}
      <form onSubmit={handleRegister} className="flex flex-col">
        <div className="flex flex-col mb-2">
          <label htmlFor="name">Nama Lengkap</label>
          <input
            className="border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 py-2"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            type="text"
            placeholder="nama lengkap"
          />
        </div>
        {message.name && (
          <div className="p-2 bg-red-300 text-red-700 text-center border border-red-700">
            <h1>{message.name[0]}</h1>
          </div>
        )}
        <div className="flex flex-col mb-2">
          <label htmlFor="username">Username</label>
          <input
            className="border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 py-2"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            type="text"
            placeholder="username"
          />
        </div>
        {message.username && (
          <div className="p-2 bg-red-300 text-red-700 text-center border border-red-700">
            <h1>{message.username[0]}</h1>
          </div>
        )}
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email</label>
          <input
            className="border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 py-2"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            placeholder="email"
          />
        </div>
        {message.email && (
          <div className="p-2 bg-red-300 text-red-700 text-center border border-red-700">
            <h1>{message.email[0]}</h1>
          </div>
        )}
        <div className="flex flex-col mb-2">
          <label htmlFor="password">Password</label>
          <input
            className="border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 py-2"
            onChange={(e) => setData({ ...data, password: e.target.value })}
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
          disabled={isLoading === false ? false : true}
        >
          {isLoading === false ? (
            "Daftar"
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
          sudah membuat akun?{" "}
          <Link
            onClick={() => setIsRegister(false)}
            className="text-blue-500 hover:text-blue-600"
          >
            Login
          </Link>
        </h1>
      </form>
    </div>
  );
};
