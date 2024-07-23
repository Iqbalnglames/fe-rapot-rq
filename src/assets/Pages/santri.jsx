import axios from "axios";
import { useEffect, useState } from "react";

export const Santri = () => {
  const [santri, setSantri] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSantriData = async () => {
    await axios.get("http://127.0.0.1:8000/api/santri").then((res) => {
      setSantri(res.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchSantriData();
  }, []);

  return (
    <div>
      <h1 className="text-lg text-center font-bold">List Data Santri</h1>
      <div className="flex justify-end">
        <button className="text-right border rounded p-2">
          + Tambah Santri
        </button>
      </div>
      <div className="flex flex-col h-[75vh]">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full">
            <div className="overflow-hidden max-h-[75vh] overflow-y-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200 sticky top-0 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Kelas
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#f8efe5] hover:text-[#9e0000]">
                      <td className="px-6 py-4 whitespace-nowrap  font-medium ">
                        <div className="w-40 h-2 rounded-lg animate-pulse bg-gray-300"></div>
                      </td>
                      <td className="  font-light px-6 py-4 whitespace-nowrap">
                        <div className="w-40 h-2 rounded-lg animate-pulse bg-gray-300"></div>
                      </td>
                      <td className="  font-light px-6 py-4 whitespace-nowrap">
                        <div className="w-40 h-2 rounded-lg animate-pulse bg-gray-300"></div>
                      </td>
                      <td className="  font-light px-6 py-4 whitespace-nowrap">
                        <div className="w-40 h-2 rounded-lg animate-pulse bg-gray-300"></div>
                      </td>
                    </tr>
                  ) : (
                    Array.isArray(santri) &&
                    santri.map((santri, index) => {
                      return (
                        <>
                          <tr
                            key={index}
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#f8efe5] hover:text-[#9e0000]"
                          >
                            <td className="px-6 py-4 whitespace-nowrap  font-medium ">
                              {index + 1}
                            </td>
                            <td className="  px-6 py-4 whitespace-nowrap">
                              {santri.nama_santri}
                            </td>
                            <td className="   px-6 py-4 whitespace-nowrap">
                              {santri.kelas.nama_kelas}
                            </td>
                            <td className="   px-6 py-4 whitespace-nowrap">
                              <button className="p-3 rounded ">Edit</button>
                              <button>Hapus</button>
                            </td>
                          </tr>
                        </>
                      );
                    })
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
