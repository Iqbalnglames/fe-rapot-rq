import { useEffect, useState } from "react";
import { fetchSantriData } from "../../utilities/fetchSantriData";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteData } from "../../utilities/deleteData";

export const Santri = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [santri, setSantri] = useState([]);

  const headData = ["#", "NIS", "Nama", "Kelas", "Nama Wali", "Alamat", "Aksi"];

  const handleFetchSantriData = async () => {
    await fetchSantriData().then((data) => {
      setSantri(data);
      setIsLoading(false);
    });
  };

  const deleteDataSantri = async (slug) => {
    setIsLoading(true);
    try {
      const deleted = await deleteData(slug);
      if (deleted.ok) {
        setSantri(santri.filter((item) => item.slug !== slug));
      } else {
        console.error("Data deletion failed");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      handleFetchSantriData()
    }
  };

 
  

  useEffect(() => {
    handleFetchSantriData()
  }, []);



  const santriTableData = ( santri ) => {
    console.log(santri)
    return(
      santri?.map((santri, index) => {
        return (
          <tr
            key={index}
            className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out"
          >
            <td className="px-6 py-1 font-medium whitespace-nowrap">
              {index + 1}
            </td>
            <td className="px-6 py-1 whitespace-nowrap">
              {santri.NIS}
            </td>
            <td className="px-6 py-1 whitespace-nowrap">
              {santri.nama}
            </td>
            <td className="px-6 py-1 whitespace-nowrap">
              {santri.kelas.kelas}
            </td>
            <td className="px-6 py-1 whitespace-nowrap">
              {santri.nama_ortu}
            </td>
            <td className="px-6 py-1 whitespace-nowrap">
              {santri.alamat}
            </td>
            <td className="px-6 py-1 whitespace-nowrap space-x-1">
              <button className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5]">
                <FaPen />
              </button>
              <button
                onClick={() => deleteDataSantri(santri.slug)}
                className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5]"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        );
      })
    )
  }

  return (
    <div>
      <h1 className="font-bold text-center text-lg">List Data Santri</h1>
      <div className="flex justify-end">
        <Link
          to={"/tambah-santri"}
          className="text-right p-2 border rounded hover:text-[#f8efe5]
hover:bg-[#9e0000]"
        >
          + Tambah Santri
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
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        <div className="bg-gray-300 rounded-lg w-40 h-2 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 font-light whitespace-nowrap">
                        <div className="bg-gray-300 rounded-lg w-40 h-2 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 font-light whitespace-nowrap">
                        <div className="bg-gray-300 rounded-lg w-40 h-2 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 font-light whitespace-nowrap">
                        <div className="bg-gray-300 rounded-lg w-40 h-2 animate-pulse"></div>
                      </td>
                    </tr>
                  ) : (
                    santriTableData(santri)
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
