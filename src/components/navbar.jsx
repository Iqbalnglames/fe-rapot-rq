import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios.get("http://localhost:8000/api/user").then((res) => {
      setUser(res.data);
    });
  };

  const logoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios.post("http://localhost:8000/api/logout").then(() => {
      localStorage.removeItem("token");
      let path = "http://localhost:5173";
      location.href = new URL("/", path).href;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className={`w-full h-20 items-center dark:bg-dark z-20`}>
      <div className="border border-x-0 border-gray-300 mx-2">
        <div className=" flex justify-end">
          <div className="flex w-full items-center py-5 justify-between px-6">
            <div></div>
            <div className="flex">
              <Link className="py-2 mt-1 border-r-2 px-4 text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-bell hover:bg-[#f8efe5] hover:text-[#9e0000] rounded-full"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
              </Link>
              <div className="">
                {open ? (
                  <div className="rounded p-2 bg-white drop-shadow-xl w-[315px] top-20 border border-slate-200 flex flex-col absolute">
                    <Link
                      onClick={() => setOpen(!open)}
                      to={"profile"}
                      className="p-2 hover:bg-slate-100"
                    >
                      Profil
                    </Link>
                    <Link
                      onClick={() => logoutHandler()}
                      className="p-2 hover:bg-slate-100 hover:text-red-700"
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                <Link
                  onClick={() => setOpen(!open)}
                  className="rounded-md bg-primary hover:text-[#9e0000] text-base font-medium hover:bg-primary/90"
                >
                  <div className="flex lg:hover:bg-[#f8efe5] hover:rounded p-2 space-x-2 ml-2">
                    <img
                      src="https://ezio.sakurani.my.id/Scr_Hvvff_154930.png"
                      className="block lg:hidden mx-auto w-10 h-10 rounded-full border-2 p-[2px] border-white hover:border-gray-300"
                    />
                    <img
                      src="https://ezio.sakurani.my.id/Scr_Hvvff_154930.png"
                      className="hidden lg:block mx-auto w-8 h-8 rounded-full"
                    />
                    <h1 className="hidden lg:block pt-1">
                      {!user.name ? "Loading...." : user.name}
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
