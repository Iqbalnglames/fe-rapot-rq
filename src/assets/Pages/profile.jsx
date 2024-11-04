import axios from "axios";
import { useEffect, useState } from "react";
import userPic from "../../assets/user.png";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios.get("http://localhost:8000/api/user").then((res) => {
      setUser(res.data);
    });
  };

  // const fetchRoleUser = async () => {
  //   await axios.get("http://localhost:8000/api/");
  // };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex space-x-2">
      <div className="space-y-4">
        <div className="p-3 w-96 flex border-slate-200 border flex-col rounded drop-shadow-lg bg-white">
          <img
            className="self-center"
            src={userPic}
            alt="user pic"
            width={150}
          />
          <h1 className="text-lg font-bold text-center">Profil Akun</h1>
          <table cellPadding={10}>
            <tr>
              <td className="w-24">Nama </td>
              <td className="w-80">: {user.name}</td>
            </tr>
            <tr>
              <td className="w-24">Username </td>
              <td className="w-80">: {user.username}</td>
            </tr>
            <tr>
              <td className="w-24">Password </td>
              <td className="w-80">: *******</td>
            </tr>
          </table>
          <Link
            className="p-2 mt-3 rounded bg-[#9e0000] text-white text-center hover:bg-[#852323]"
            to={`ubah-profile/${user.slug}`}
          >
            Ubah Data
          </Link>
        </div>
        <div className="p-3 w-96 rounded h-[373px] border border-slate-200 drop-shadow-lg bg-white">
          <h1 className="text-center font-bold text-xl">Role Anda</h1>
          <div className="grid grid-cols-3 gap-3">
            {user.roles?.length !== 0 ? (
              user.roles?.map((role, k) => {
                return (
                  <div className="" key={k}>
                    <div className="p-2 mt-2 rounded bg-[#9e0000] text-white">
                      {role.nama_role}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Belum ada role</div>
            )}
          </div>
          <div className="mt-2">
            <h1 className="text-center font-bold text-lg">
              Tanda Tangan Antum (untuk rapot santri)
            </h1>
            <div className="flex flex-col">
              <img
                src="https://upload.wikimedia.org/wikipedia/id/thumb/b/b7/Tanda_Tangan_Sjachroedin_ZP.png/1200px-Tanda_Tangan_Sjachroedin_ZP.png"
                alt="tanda tangan"
                width={200}
                height={200}
                className="self-center"
              />
              <form className="">
                <span>Upload Tanda Tangan di sini</span>
                <input type="file" name="" id="" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 w-full flex border-slate-200 border flex-col rounded drop-shadow-lg bg-white">
        <h1 className="font-bold text-bold">Mata Pelajaran yang Antum Ampu</h1>
        {user.mapels?.length !== 0 ? (
          user.mapels?.map((mapel, k) => {
            return (
              <div className="" key={k}>
                <div className="p-2 mt-2 rounded bg-[#9e0000] text-white">
                  {mapel.nama_mapel}
                </div>
              </div>
            );
          })
        ) : (
          <div>Belum ada Mata Pelajaran yang antum ampu</div>
        )}
      </div>
    </div>
  );
};
