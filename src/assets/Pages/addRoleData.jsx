import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/alert";
import { TbChecklist } from "react-icons/tb";

export const AddRoleData = () => {
  const [isSended, setIsSended] = useState(false);
  const [validation, setValidation] = useState(false);
  const [data, setData] = useState({
    nama_role: "",
  });
  const [role, setRole] = useState([]);

  const headData = ["No", "Nama Role"];

  const handleFetchRole = async () => {
    await axios.get("http://127.0.0.1:8000/api/role").then((res) => {
      setRole(res.data.data);
    });
  };

  useEffect(() => {
    handleFetchRole();
  }, [isSended]);

  const handleSubmitData = async (eve) => {
    eve.preventDefault();
    const formData = new FormData();

    formData.append("nama_role", data.nama_role);

    await axios
      .post("http://127.0.0.1:8000/api/role", formData)
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
        <div className="w-80 space-y-3 p-4 grid grid-cols place-items-center fixed z-20  top-[35%] left-[45%] transition ease-in-out delay-150">
          <Alert
            icon={<TbChecklist />}
            pesan={"data role berhasil dikirimkan"}
            pathA={"/pendataan"}
            buttonA={"Kembali ke menu"}
            pathB={() => setIsSended(false)}
            buttonB={"tambah lagi"}
          />
        </div>
      ) : (
        ""
      )}
      {validation
        ? validation && (
            <div className="w-80 space-y-3 p-4 grid grid-cols place-items-center fixed z-20  top-[35%] left-[45%] transition ease-in-out delay-150">
              <Alert
                icon={<TbChecklist />}
                pesan={validation.nama_role[0]}
                pathB={() => setValidation(!validation)}
                buttonB={"tutup"}
              />
            </div>
          )
        : null}
      <h1 className="text-center font-bold text-lg">Tambah data role baru</h1>
      <div className="max-h-96 overflow-hidden overflow-y-auto">
        <table className="w-1/2">
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
            {role.map((item, key) => {
              return (
                <tr
                  key={key}
                  className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out"
                >
                  <td>{key + 1}</td>
                  <td>{item.nama_role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmitData} method="post">
        <div className="grid grid-cols space-y-2 rounded border border-slate-200 drop-shadow-xl bg-white p-4 mt-4">
          <span>Nama Role</span>
          <input
            className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
            type="text"
            placeholder="nama role"
            onChange={(e) => setData({ ...data, nama_role: e.target.value })}
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