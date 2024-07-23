import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

export const Rapot = () => {
  const [open, setOpen] = useState(false);
  const [classPointApi, setClassPointApi] = useState("");
  const [kelas, setKelas] = useState([]);

  const fetchKelas = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/kelas");
      setKelas(res.data.data);
    } catch (error) {
      console.error("Error fetching kelas:", error);
    }
  };

  useEffect(() => {
    fetchKelas();
  }, []);

  const kelasOpt = (kelas, intText) => {
    setClassPointApi(kelas);
    setOpen(false);
    document.getElementById("judulOpsi").innerText = intText;
  };

  return (
    <>
      <h1>List Rapot Santri</h1>
      <div className="flex justify-between">
        <Link
          
          className="flex justify-between border p-4 border-slate-300 rounded w-72"
          onClick={() => setOpen(!open)}
        >
          <h1 id="judulOpsi">Pilih Kelas</h1>
        <IoIosArrowDropdown className={open ? 'rotate-180 mt-1' : 'mt-1' } />
        </Link>
      </div>

      <div
        className={`mt-3 transition-all ease-in-out bg-white drop-shadow-md duration-150 border border-slate-300 rounded max-w-72 overflow-hidden ${
          open ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
        }`}
      >
        {Array.isArray(kelas) &&
          kelas.map((kelas, index) => {
            return (
              <button
                key={index}
                onClick={() => kelasOpt(kelas.slug, kelas.nama_kelas)}
                className="block w-72 text-left hover:bg-[#f8efe5] hover:text-[#9e0000] border-y p-4"
              >
                {kelas.nama_kelas}
              </button>
            );
          })}
      </div>
    </>
  );
};
