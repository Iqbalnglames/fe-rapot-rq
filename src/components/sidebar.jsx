import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="z-0">
      <nav className="flex flex-col w-64 h-screen px-4 tex-gray-900 border border-gray-300">
        <div className="flex mt-5 mx-3">
          <img
            className="inline"
            width={50}
            src="https://raudhatulquran.com/wp-content/uploads/2023/08/LOGO-RQ-e1692688413673.png"
          />
        </div>
        <div className="mt-5 mb-4">
          <ul className="">
            <li className="mb-2 px-4 py-4 text-slate-600 flex flex-row  border-gray-300 hover:bg-[#f8efe5] hover:text-[#9e0000] hover:font-bold rounded-lg">
              <span>
                <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                  <path
                    d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                        4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                        4h4v-4h-4M4 8h4V4H4v4z"
                  ></path>
                </svg>
              </span>
              <Link to={"/"}>
                <span className="ml-2">Dashboard</span>
              </Link>
            </li>
            <li className="mb-2 px-4 py-4 text-slate-600 flex flex-row  border-gray-300 hover:text-[#9e0000]   hover:bg-[#f8efe5]  hover:font-bold rounded-lg">
              <span>
                <FaClipboardList />
              </span>
              <Link to={"/pendataan"}>
                <span className="ml-2">Pendataan</span>
              </Link>
            </li>
            <li className="mb-2 px-4 py-4 text-slate-600 flex flex-row  border-gray-300 hover:text-[#9e0000]   hover:bg-[#f8efe5]  hover:font-bold rounded-lg">
              <span>
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                        014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                        8-4z"
                  ></path>
                </svg>
              </span>
              <Link to={"/asatidzah"}>
                <span className="ml-2">Asatidzah</span>
              </Link>
            </li>
            <li className="mb-2 px-4 py-4 text-slate-600 flex flex-row  border-gray-300 hover:text-[#9e0000] hover:bg-[#f8efe5]  hover:font-bold rounded-lg">
              <span>
                <svg
                  className="fill-current h-5 w-5 "
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <Link to={"/santri"}>
                <span className="ml-2">Santri</span>
              </Link>
            </li>

            <li className="mb-2 px-4 py-4 text-slate-600 flex flex-row  border-gray-300 hover:text-[#9e0000]   hover:bg-[#f8efe5]  hover:font-bold rounded-lg">
              <span>
                <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                  <path
                    d="M12 13H7v5h5v2H5V10h2v1h5v2M8
                        4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
                        9v2h-4v-2h4m2-2h-8v6h8v-6z"
                  ></path>
                </svg>
              </span>
              <Link to={"/rapot"}>
                <span className="ml-2">Rapot</span>
              </Link>
            </li>
            <li
              className="mb-2 px-4 py-4 text-slate-600 flex flex-row  border-gray-300 hover:text-[#9e0000] hover:bg-[#f8efe5]  hover:font-bold
            rounded-lg"
            >
              <span>
                <svg
                  className="fill-current h-5 w-5 "
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <a href="#">
                <span className="ml-2">Pengaturan</span>
              </a>
            </li>
            <li
              className="mb-2 px-4 py-4 text-slate-600 flex flex-row  border-gray-300 hover:text-[#9e0000] hover:bg-[#f8efe5]  hover:font-bold
            rounded-lg"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-exclamation-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                </svg>
              </span>
              <a href="#">
                <span className="ml-2">info</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
