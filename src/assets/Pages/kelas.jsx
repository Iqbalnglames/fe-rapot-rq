import { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { fetchKelas } from "../../utilities/fetchKelas";
import { fetchKelasSantri } from "../../utilities/fetchKelasSantri";
import { FaPen, FaTrash } from "react-icons/fa";

export const Kelas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [santriData, setSantriData] = useState([]);
  const [open, setOpen] = useState(false);
  const [kelas, setKelas] = useState([]);
  const [classApiPoint, setclassApiPoint] = useState("");

  const headData = ["#", "NIS", "Nama", "Nama Wali", "Alamat", "Aksi"];

  const notFoundData = (
    <tr>
      <td colSpan={6} className="p-4 text-center">
        Tidak ada data untuk kelas ini.
      </td>
    </tr>
  );

  const loadingBar = (
    <tr className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out">
      {Array(6)
        .fill()
        .map((_, index) => (
          <td key={index} className="px-6 py-4 font-medium whitespace-nowrap">
            <div className="bg-gray-300 rounded-lg w-40 h-2 animate-pulse"></div>
          </td>
        ))}
    </tr>
  );

  const kelasOpt = (slug, intText) => {
    setOpen(false);
    setIsLoading(true);
    setclassApiPoint(slug);
    document.getElementById("judulOpsi").innerText = intText;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kelasData = await fetchKelas();
        setKelas(kelasData);

        if (classApiPoint) {
          const santri = await fetchKelasSantri(classApiPoint);
          setSantriData(santri);
        } else {
          setSantriData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classApiPoint]);

  const renderSantriData = () => {
    if (santriData === "tidak ada data") {
      return notFoundData;
    } else {
      return santriData.map((data) =>
        data.santri.map((santriDatas, index) => {
          return (
            <tr
              className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out"
              key={index}
            >
              <td className="px-6 py-1 font-medium whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-6 py-1 font-medium whitespace-nowrap">
                {santriDatas.NIS}
              </td>
              <td className="px-6 py-1 font-medium whitespace-nowrap">
                {santriDatas.nama}
              </td>
              <td className="px-6 py-1 font-medium whitespace-nowrap">
                {santriDatas.nama_ortu}
              </td>
              <td className="px-6 py-1 font-medium whitespace-nowrap">
                {santriDatas.alamat}
              </td>
              <td className="px-6 py-1 whitespace-nowrap space-x-1">
                <button className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5]">
                  <FaPen />
                </button>
                <button className="hover:bg-[#9e0000] p-2 border rounded-md max-w-fit text-center hover:text-[#f8efe5]">
                  <FaTrash />
                </button>
              </td>
            </tr>
          );
        })
      );
    }
  };

  console.log(santriData);

  return (
    <div>
      <h1>List Rapot Santri</h1>
      <div className="flex justify-between">
        <Link
          className="flex justify-between border-slate-300 p-4 border rounded w-72"
          onClick={() => setOpen(!open)}
        >
          <h1 id="judulOpsi">Pilih Kelas</h1>
          <IoIosArrowDropdown className={open ? "rotate-180 mt-1" : "mt-1"} />
        </Link>
      </div>
      <div
        className={`mt-3 transition-all ease-in-out bg-white drop-shadow-md duration-150 border border-slate-300 rounded max-w-72 overflow-hidden ${
          open ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
        }`}
      >
        {Array.isArray(kelas) &&
          kelas.map((k, index) => {
            return (
              <button
                key={index}
                onClick={() => kelasOpt(k.slug, k.kelas)}
                className="block border-y hover:bg-[#f8efe5] p-4 w-72 text-left hover:text-[#9e0000]"
              >
                {k.kelas}
              </button>
            );
          })}
      </div>
      <h1 className="font-bold text-center text-lg">List Data Santri</h1>
      <div className="flex justify-end">
        <Link className="text-right p-2 border rounded">+ Tambah Santri</Link>
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
                    loadingBar
                  ) : classApiPoint === "" ? (
                    <tr>
                      <td className="text-center" colSpan={6}>
                        silahkan pilih kelas
                      </td>
                    </tr>
                  ) : (
                    renderSantriData()
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
