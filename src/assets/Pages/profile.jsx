import { useEffect, useState } from "react";
import userPic from "../../assets/user.png";
import { Link } from "react-router-dom";
import { fetchUser } from "../../utilities/fetchUser";
import axios from "axios";

export const Profile = () => {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState([]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSignatureUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tanda_tangan", selectedImage);

    await axios
      .post(
        `https://api.rapot.techbatchtech.my.id/api/${user.slug}/update-signature`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        alert(res.message);
      });
  };

  useEffect(() => {
    fetchUser().then((res) => {
      setUser(res.data);
    });
  }, []);
  return (
    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-2">
      <div className="space-y-4">
        <div className="p-3 lg:w-96 flex border-slate-200 border flex-col rounded drop-shadow-lg bg-white">
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
        <div className="p-3 lg:w-96 rounded h-[373px] border border-slate-200 drop-shadow-lg bg-white">
          <div className="mt-2">
            <h1 className="text-center font-bold text-lg">
              Tanda Tangan Antum (untuk rapot santri)
            </h1>
            {user.roles?.some((role) => role.nama_role === "Wali Kelas" || role.nama_role === "Kepala Sekolah") ===
            true ? (
              <div className="flex flex-col">
                <img
                  src={`https://api.rapot.techbatchtech.my.id/storage/tanda-tangan/${user.tanda_tangan}`}
                  alt="tanda tangan"
                  width={200}
                  height={200}
                  className="self-center"
                />
                <form onSubmit={handleSignatureUpload} method="post">
                  <span>Upload Tanda Tangan di sini</span>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    name="signatureUp"
                  />
                  <button className="p-2 mt-3 rounded bg-[#9e0000] text-white text-center hover:bg-[#852323]" type="submit">Upload</button>
                </form>
              </div>
            ) : (
              <h1 className="text-center">
                Antum tidak perlu mengupload tanda tangan
              </h1>
            )}
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
        <h1 className="font-bold text-xl">Role Antum</h1>
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
      </div>
    </div>
  );
};
