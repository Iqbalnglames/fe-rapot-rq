import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { IoWarning } from "react-icons/io5";
import { Alert } from "../../components/alert";
import { TbChecklist } from "react-icons/tb";

export const EditUstadz = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    isActive: "",
  });
  const { slug } = useParams();
  const [isSended, setIsSended] = useState(false);
  const [validation, setValidation] = useState([]);
  const [errors, setErrors] = useState(false);

  const handleFetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/user/${slug}/edit`)
      .then((res) => {
        setData({
          username: res.data.data.username,
          name: res.data.data.name,
          email: res.data.data.email,
        });
      });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleSendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("isActive", data.isActive === true ? 1 : 0);

    await axios
      .post("http://127.0.0.1:8000/api/register", formData)
      .then(() => {
        setIsSended(true);
      })
      .catch((error) => {
        setErrors(true);
        setValidation(error.response.data);
      });
  };

  return (
    <>
      {isSended ? (
        <Alert
          icon={<TbChecklist />}
          pesan={"data berhasil dikirimkan"}
          pathA={"/asatidzah"}
          buttonA={"Kembali ke List"}
          pathB={() => setIsSended(true)}
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
        <h1 className="text-center font-bold text-lg">Edit data ustadz</h1>
        <form onSubmit={handleSendData} method="post">
          <div className="grid grid-cols space-y-2 rounded border border-slate-200 drop-shadow-xl bg-white p-4 mt-4">
            <span>Nama Lengkap Pegawai</span>
            <input
              className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
              type="text"
              placeholder="nama ustadz"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            {validation.name && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.name[0]}
              </div>
            )}
            <span>Username</span>
            <input
              className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
              type="text"
              placeholder="username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            {validation.username && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.username[0]}
              </div>
            )}
            <span>Email</span>
            <input
              className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2 "
              placeholder="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            {validation.email && (
              <div className="my-2 p-2 bg-red-200 border border-red-600 text-red-600">
                {validation.email[0]}
              </div>
            )}
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
