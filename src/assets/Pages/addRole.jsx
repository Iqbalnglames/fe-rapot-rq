import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { IoWarning } from "react-icons/io5";
import { Alert } from "../../components/alert";
import { TbChecklist } from "react-icons/tb";
import { fetchKelas } from "../../utilities/fetchKelas";

export const AddRole = () => {
  const [roleId, setRoleId] = useState([]);
  const [role, setRole] = useState([]);
  const [userData, setUserData] = useState({});
  const [isSended, setIsSended] = useState(false);
  const [validation, setValidation] = useState([]);
  const [errors, setErrors] = useState(false);
  const [kelas, setKelas] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");

  const { slug } = useParams();

  const fetchUserData = async () => {
    await axios.get(`https://rapot.api.techbatchtech.my.id/api/${slug}/role`).then((res) => {
      setUserData(res.data.data);
      setRoleId(res.data.data.roles);
    });
  };

  const fetchRole = async () => {
    await axios
      .get("https://rapot.api.techbatchtech.my.id/api/role")
      .then((res) => {
        setRole(res.data.data);
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  console.log(role);

  useEffect(() => {
    fetchUserData();
    fetchRole();
    fetchKelas().then((data) => {
      setKelas(data);
    });
  }, []);

  const removedDuplicateRole = roleId.filter(
    (item, index) => roleId.indexOf(item) === index
  );

  const finalResultRoleId = removedDuplicateRole.map((item) => item.id);

  const handleSendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("role_id", JSON.stringify(finalResultRoleId));
    formData.append(
      "kelas_id",
      removedDuplicateRole.some((role) => role.nama_role === "Wali Kelas") ===
        true
        ? selectedKelas
        : ""
    );

    await axios
      .post(`https://rapot.api.techbatchtech.my.id/api/${slug}/update-role`, formData)
      .then(() => {
        setIsSended(!isSended);
      })
      .catch((error) => {
        setErrors(true);
        setValidation(error.response.data);
      });
    console.log(!isSended);
  };

  return (
    <>
      {isSended === true ? (
        <Alert
          icon={<TbChecklist />}
          pesan={"role berhasil ditambahkan"}
          pathA={"/asatidzah"}
          buttonA={"Kembali ke List"}
          pathB={() => setIsSended(!isSended)}
          buttonB={"tambah lagi"}
        />
      ) : null}
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
          Tambah role ustadz baru
        </h1>
        <form onSubmit={handleSendData} method="post">
          <div className="grid grid-cols space-y-2 rounded border border-slate-200 drop-shadow-xl bg-white p-4 mt-4">
            <span>Nama Lengkap Pegawai</span>
            <input
              className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
              type="text"
              placeholder="nama ustadz"
              value={!userData.name ? "Loading..." : userData.name}
              disabled
            />
            <span>Pilih Role Anda</span>
            <div className="flex lg:flex-row flex-col space-y-6 lg:space-y-0 lg:space-x-2 lg:p-2 p-4 border border-slate-300 rounded lg:h-32">
              {roleId.length !== 0
                ? removedDuplicateRole.map((item, key) => {
                    return (
                      <div key={key}>
                        <Link
                          onClick={() =>
                            setRoleId(
                              removedDuplicateRole.filter((_, k) => k !== key)
                            )
                          }
                          className="rounded-full border bg-white border-slate-300 p-2 hover:bg-slate-100 h-fit cursor-pointer"
                        >
                          <h1 className="inline text-slate-500">X</h1>{" "}
                          <h1 className="inline">{item.nama_role}</h1>
                          <input type="hidden" value={item.id} />
                        </Link>
                      </div>
                    );
                  })
                : "belum ada role yang dipilih"}
            </div>
            <div className="flex lg:space-x-2 flex-col lg:flex-row space-y-4 lg:space-y-0">
              {role?.map((item, key) => {
                return (
                  <Link
                    disabled={removedDuplicateRole.some(
                      (removedItem) => removedItem.nama_role === item.nama_role
                    )}
                    key={key}
                    onClick={(e) => {
                      const hiddenInput =
                        e.target.querySelector("input[type=hidden]");
                      if (hiddenInput) {
                        setRoleId([...roleId, item]);
                      }
                    }}
                    className="rounded-full w-fit border border-slate-300 p-2 hover:bg-slate-100 h-fit disabled:bg-slate-50"
                  >
                    <h1 className="inline">{item.nama_role}</h1>
                    <input type="hidden" value={item.id} />
                  </Link>
                );
              })}
            </div>
            {validation.role_id && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.role_id[0]}
              </div>
            )}
            <div>
              {removedDuplicateRole.some(
                (role) => role.nama_role === "Wali Kelas"
              ) === true ? (
                <>
                  <span>Kelas</span>
                  <select
                    className="p-2 focus:border-b-2 border-b w-full border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
                    name="kelas"
                    id=""
                    onChange={(e) => setSelectedKelas(e.target.value)}
                  >
                    <option>-- pilih kelas --</option>
                    {kelas.map((kelas) => {
                      return <option value={kelas.id}>{kelas.kelas}</option>;
                    })}
                  </select>
                </>
              ) : null}
            </div>
            <div className="flex space-x-2">
              <Link
                to={"/asatidzah"}
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
