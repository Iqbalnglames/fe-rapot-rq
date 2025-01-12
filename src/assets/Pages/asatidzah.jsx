import { useEffect, useState } from "react";
import {
  FaBookReader,
  FaPen,
  FaTrash,
  FaUserCheck,
  FaUserTag,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchAsatidzahData } from "../../utilities/fetchAsatidzahData";
import axios from "axios";
import { Alert } from "../../components/alert";
import { TbChecklist } from "react-icons/tb";
import { deleteData } from "../../utilities/deleteUstadz";

export const Asatidzah = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const [asatidzah, setAsatidzah] = useState([]);

  const headData = ["No", "NIP", "Nama", "Mapel", "Role", "Email", "Aksi"];

  const handleFetchAsatidzahData = async () => {
    await fetchAsatidzahData().then((data) => {
      setAsatidzah(data);
      setIsLoading(false);
    });
  };

  const loadingItems = [];
  for (let i = 0; i < headData.length; i++) {
    loadingItems.push(
      <td className="px-6 py-4 font-light whitespace-nowrap">
        <div className="bg-gray-300 rounded-lg w-40 h-2 animate-pulse"></div>
      </td>
    );
  }

  const handleActivateAccount = async (id) => {
    setIsLoaded(true);
    const formData = new FormData();
    formData.append("isActive", 1);

    await axios
      .post(`http://127.0.0.1:8000/api/${id}/activate`, formData)
      .then(() => {
        setIsActivate(true);
        setIsLoaded(false);
      });
  };

  const deleteDataAsatidzah = async (slug) => {
    setIsLoading(true);
    try {
      const deleted = await deleteData(slug);
      if (deleted.ok) {
        setAsatidzah(asatidzah.filter((item) => item.slug !== slug));
      } else {
        console.error("Data deletion failed");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      handleFetchAsatidzahData();
    }
  };

  useEffect(() => {
    handleFetchAsatidzahData();
  }, [isActivate]);

  const asatidzahTableData = (ustadz) => {
    return ustadz?.map((ustadz, index) => {
      return (
        <tr
          key={index}
          className="bg-white hover:bg-[#f8efe5] border-b z-0 hover:text-[#9e0000] transition duration-300 ease-in-out"
        >
          <td className="px-6 py-1 font-medium whitespace-nowrap">
            {index + 1}
          </td>
          <td className="px-6 py-1 whitespace-nowrap">{ustadz.id}</td>
          <td className="px-6 py-1 whitespace-nowrap">{ustadz.name}</td>
          <td className="px-6 py-1 whitespace-nowrap">
            <div className="flex flex-col space-y-2">
              {ustadz.mapels.length === 0
                ? "belum memiki mapel ajar"
                : ustadz.mapels?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="p-2 w-32 bg-[#9e0000] overflow-x-hidden text-white rounded ">
                          {item.nama_mapel.length > 10
                            ? item.nama_mapel
                                .replace("dan", "")
                                .match(/\b(\w)/g)
                                .join("")
                            : item.nama_mapel}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </td>
          <td className="px-6 py-1 whitespace-nowrap">
            <div className="flex space-x-2">
              {ustadz.roles.length === 0
                ? "belum memiki role"
                : ustadz.roles?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="p-2 w-32 bg-[#9e0000] text-white rounded ">
                          {item.nama_role === "Wali Kelas"
                            ? `${
                                item.nama_role
                              } ${" "} ${ustadz.kelas?.kelas.replace(
                                /\D/g,
                                ""
                              )}`
                            : item.nama_role}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </td>
          <td className="px-6 py-1 whitespace-nowrap">{ustadz.email}</td>
          <td className="px-6 py-1 whitespace-nowrap w-full">
            <div className="flex flex-row justify-center space-x-2">
              <button
                onClick={() => handleActivateAccount(ustadz.id)}
                disabled={ustadz.isActive === 0 ? false : true}
                className={`${
                  ustadz.isActive === 0
                    ? "hover:bg-[#9e0000] hover:text-[#f8efe5] "
                    : "text-gray-300"
                } p-2 border rounded-md max-w-fit text-center relative group`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  {ustadz.isActive === 0
                    ? "aktifkan akun"
                    : "akun sudah diaktifkan"}
                </div>
                {isLoaded === true ? (
                  <svg className="loader inline" viewBox="25 25 50 50">
                    <circle
                      className="stroke-black"
                      r="20"
                      cy="50"
                      cx="50"
                    ></circle>
                  </svg>
                ) : (
                  <FaUserCheck />
                )}
              </button>
              <Link
                to={`/edit-asatidzah/${ustadz.slug}`}
                className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5] relative group"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  edit data ustadz
                </div>
                <FaPen />
              </Link>
              <Link
                to={`/tambah-role/${ustadz.slug}`}
                className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5] relative group"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  edit role ustadz
                </div>
                <FaUserTag />
              </Link>
              <Link
                to={`/tambah-mapel-ajar/${ustadz.slug}`}
                className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5] relative group"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  edit mapel ajar ustadz
                </div>
                <FaBookReader />
              </Link>
              <Link
                onClick={() => deleteDataAsatidzah(ustadz.slug)}
                className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5] relative group"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  hapus akun
                </div>
                <FaTrash />
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      {isActivate === true ? (
        <div className="w-80 space-y-3 p-4 grid grid-cols place-items-center fixed z-20 top-[35%] left-[45%] transition ease-in-out delay-150">
          <Alert
            icon={<TbChecklist />}
            pesan={"akun berhasil diaktifkan"}
            pathB={() => setIsActivate(false)}
            buttonB={"Tutup"}
          />
        </div>
      ) : null}
      <h1 className="font-bold text-center text-lg">List Data Asatidzah</h1>
      <div className="flex justify-end">
        <Link
          to={"/tambah-ustadz"}
          className="text-right p-2 border rounded hover:text-[#f8efe5]
hover:bg-[#9e0000]"
        >
          + Tambah Ustadz
        </Link>
      </div>
      <div className="flex flex-col h-[75vh]">
        <div className="sm:mx-0.5 lg:mx-0.5 overflow-x-auto">
          <div className="inline-block py-2 min-w-full">
            <div className="max-h-[75vh] overflow-hidden overflow-y-auto">
              <table className="min-w-full">
                <thead className="top-0 sticky bg-gray-200 border-b">
                  <tr>
                    {headData.map((data, k) => {
                      return (
                        <th
                          key={k}
                          scope="col"
                          className="px-6 py-4 font-medium text-gray-900 text-left"
                        >
                          {data}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out">
                      {loadingItems}
                    </tr>
                  ) : (
                    asatidzahTableData(asatidzah)
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
