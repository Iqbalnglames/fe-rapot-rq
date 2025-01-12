import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/alert";
import { TbChecklist } from "react-icons/tb";

export const AddTajarData = () => {
  const [isSended, setIsSended] = useState(false);
  const [validation, setValidation] = useState(false);
  const [data, setData] = useState({
    tajar: "",
  });

  const handleSubmitData = async (eve) => {
    eve.preventDefault();
    const formData = new FormData();

    formData.append("tajar", data.tajar);

    await axios
      .post("http://api.rapot.techbatchtech.my.id/api/tahun-ajaran", formData)
      .then(() => {
        setIsSended(true);
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div>
      {isSended === true ? (
        <Alert
          icon={<TbChecklist />}
          pesan={"data tahun ajaran berhasil dikirimkan"}
          pathA={"/pendataan"}
          buttonA={"Kembali ke menu"}
          pathB={() => setIsSended(false)}
          buttonB={"tambah lagi"}
        />
      ) : (
        ""
      )}
      {validation
        ? validation && (
            <div className="w-80 space-y-3 p-4 grid grid-cols place-items-center fixed z-20  top-[35%] left-[45%] transition ease-in-out delay-150">
              <Alert
                icon={<TbChecklist />}
                pesan={validation.tajar[0]}
                pathB={() => setValidation(!validation)}
                buttonB={"tutup"}
              />
            </div>
          )
        : null}
      <h1 className="text-center font-bold text-lg">
        Tambah data Tahun Ajaran baru
      </h1>
      <form onSubmit={handleSubmitData} method="post">
        <div className="grid grid-cols space-y-2 rounded border border-slate-200 drop-shadow-xl bg-white p-4 mt-4">
          <span>Tahun Ajaran (format : 2024/2025)</span>
          <input
            className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
            type="text"
            placeholder="masukkan tahun ajaran"
            onChange={(e) => setData({ ...data, tajar: e.target.value })}
          />
          <div className="flex space-x-2">
            <Link
              to={"/pendataan"}
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
  );
};
