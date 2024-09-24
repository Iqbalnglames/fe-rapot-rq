import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteData } from "../../utilities/deleteData";
import { fetchAsatidzahData } from "../../utilities/fetchAsatidzahData";

export const Asatidzah = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [asatidzah, setAsatidzah] = useState([]);

  const headData = ["#", "NIP", "Nama", "Mapel", "Role", "Email", "Aksi"];

  const handleFetchAsatidzahData = async () => {
    await fetchAsatidzahData().then((data) => {
        console.log(data)
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
  }, []);

  const asatidzahTableData = (ustadz) => {
    console.log(ustadz);
    return ustadz?.map((ustadz, index) => {
      return (
        <tr
          key={index}
          className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out"
        >
          <td className="px-6 py-1 font-medium whitespace-nowrap">
            {index + 1}
          </td>
          <td className="px-6 py-1 whitespace-nowrap">{ustadz.id}</td>
          <td className="px-6 py-1 whitespace-nowrap">{ustadz.name}</td>
          <td className="px-6 py-1 whitespace-nowrap">{'tes mapel'}</td>
          <td className="px-6 py-1 whitespace-nowrap">{ustadz.nama_ortu}</td>
          <td className="px-6 py-1 whitespace-nowrap">{ustadz.email}</td>
          <td className="px-6 py-1 whitespace-nowrap space-x-1">
            <button className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5]">
              <FaPen />
            </button>
            <button
              onClick={() => deleteDataAsatidzah(ustadz.slug)}
              className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5]"
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1 className="font-bold text-center text-lg">List Data Asatidzah</h1>
      <div className="flex justify-end">
        <Link
          to={"/tambah-santri"}
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
                    {headData.map((data, i) => {
                      return (
                        <th
                          key={i}
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
