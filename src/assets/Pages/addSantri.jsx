import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchKelas } from "./../../utilities/fetchKelas";
import axios from "axios";
import { IoWarning } from "react-icons/io5";

export const AddSantriData = () => {
  const [kelas, setKelas] = useState([]);
  const [NIS, setNIS] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kelasSantri, setKelasSantri] = useState("");
  const [namaOrtu, setNamaOrtu] = useState("");
  const [validation, setValidation] = useState([]);
  const [errors, setErrors] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchKelas().then((data) => {
      setKelas(data);
    });
  }, []);

  const handleSendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("NIS", NIS);
    formData.append("alamat", alamat);
    formData.append("kelas_id", kelasSantri);
    formData.append("nama_ortu", namaOrtu);

    await axios
      .post("https://rapot.api.techbatchtech.my.id/api/santri/add", formData)
      .then(() => {
        navigate("/santri");
      })
      .catch((error) => {
        setErrors(true);
        setValidation(error.response.data);
      });
  };

  return (
    <>
      {errors ? (
        <>
          <div className="w-screen h-screen fixed z-10 bg-[#0000005e] top-0 left-0 "></div>
          <div className="w-80 space-y-3 border p-4 shadow-md rounded grid grid-cols place-items-center fixed z-20 bg-white top-[35%] left-[45%] transition ease-in-out delay-150">
            <IoWarning className="text-red-600 text-6xl" />
            <h1>Periksa kembali form yang anda isi!</h1>
            <button
              onClick={() => {
                setErrors(false);
              }}
              className="w-16 p-2 rounded-md hover:text-[#f8efe5] hover:w-[70px] hover:bg-[#9e0000] text-[#9e0000] border border-[#9e0000] transition ease-in-out"
            >
              Tutup
            </button>
          </div>
        </>
      ) : null}
      <div>
        <h1 className="text-center font-bold text-lg">
          Tambah data santri baru
        </h1>
        <form onSubmit={handleSendData} method="post">
          <div className="grid grid-cols space-y-2 rounded border border-slate-200 drop-shadow-xl bg-white p-4 mt-4">
            <span>Nomer Induk Santri</span>
            <input
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
              type="number"
              placeholder="Nomer Induk Santri"
              onChange={(e) => setNIS(e.target.value)}
            />
            {validation.NIS && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.NIS[0]}
              </div>
            )}

            <span>Nama Lengkap Santri</span>
            <input
              className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
              type="text"
              placeholder="nama santri"
              onChange={(e) => setNama(e.target.value)}
            />
            {validation.nama && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.nama[0]}
              </div>
            )}
            <span>Nama Orang Tua / Wali</span>
            <input
              className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
              type="text"
              placeholder="nama orang tua/wali"
              onChange={(e) => setNamaOrtu(e.target.value)}
            />
            {validation.nama_ortu && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.nama_ortu[0]}
              </div>
            )}
            <span>Alamat</span>
            <textarea
              className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
              placeholder="alamat lengkap santri"
              onChange={(e) => setAlamat(e.target.value)}
            />
            {validation.alamat && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.alamat[0]}
              </div>
            )}
            <span>Kelas</span>
            <select
              className="p-2 focus:border-b-2 border-b border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
              name="kelas"
              id=""
              onChange={(e) => setKelasSantri(e.target.value)}
            >
              <option>-- pilih kelas --</option>
              {kelas.map((kelas) => {
                return (
                  <>
                    <option value={kelas.id}>{kelas.kelas}</option>
                  </>
                );
              })}
            </select>
            {validation.kelas_id && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.kelas_id[0]}
              </div>
            )}
            <div className="flex space-x-2">
              <Link
                to={"/santri"}
                className="w-32 p-2 text-center rounded-md text-[#f8efe5] bg-[#9e0000]"
              >
                Kembali
              </Link>
              <button className="w-32 p-2 rounded-md hover:text-[#f8efe5] hover:bg-[#9e0000] text-[#9e0000] border border-[#9e0000] ">
                Simpan Data
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
