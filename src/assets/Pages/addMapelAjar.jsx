import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { IoWarning } from "react-icons/io5";
import { Alert } from "../../components/alert";
import { TbChecklist } from "react-icons/tb";

export const AddMapelAjar = () => {
  const [mapelId, setMapelId] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [userData, setUserData] = useState({});
  const [isSended, setIsSended] = useState(false);
  const [validation, setValidation] = useState([]);
  const [errors, setErrors] = useState(false);

  const { slug } = useParams();

  const fetchUserData = async () => {
    await axios
      .get(`https://api.rapot.techbatchtech.my.id/api/${slug}/mapel-ajar`)
      .then((res) => {
        setUserData(res.data.data);
        setMapelId(res.data.data.mapels);
      });
  };

  const fetchMapel = async () => {
    await axios
      .get("https://api.rapot.techbatchtech.my.id/api/mapel")
      .then((res) => {
        setMapel(res.data.data);
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  console.log(mapel);

  useEffect(() => {
    fetchUserData();
    fetchMapel();
  }, []);

  const removedDuplicateMapel = mapelId.filter(
    (item, index) => mapelId.indexOf(item) === index
  );

  const finalResultMapelId = removedDuplicateMapel.map((item) => item.id);

  const handleSendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("mapel_id", JSON.stringify(finalResultMapelId));

    await axios
      .post(`https://api.rapot.techbatchtech.my.id/api/${slug}/update-mapel-ajar`, formData)
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
          pesan={"mapel berhasil ditambahkan"}
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
          Tambah Mapel Ustadz Baru
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
            <span>Pilih Mapel Anda</span>
            <div className="flex lg:space-x-2 space-y-4 lg:space-y-0 flex-col overflow-scroll w-full lg:flex-row p-2 py-4 border border-slate-300 rounded lg:h-32">
              {mapelId.length !== 0
                ? removedDuplicateMapel.map((item, key) => {
                    return (
                      <div key={key}>
                        <Link
                          onClick={() =>
                            setMapelId(
                              removedDuplicateMapel.filter((_, k) => k !== key)
                            )
                          }
                          className="rounded-full border bg-white border-slate-300 p-2 hover:bg-slate-100 h-fit cursor-pointer"
                        >
                          <h1 className="inline text-slate-500">X</h1>{" "}
                          <h1 className="inline">{item.nama_mapel}</h1>
                          <input type="hidden" value={item.id} />
                        </Link>
                      </div>
                    );
                  })
                : "belum ada mapel yang dipilih"}
            </div>
            <div className="flex lg:space-x-2 space-y-4 lg:space-y-0 flex-col lg:flex-row">
              {mapel?.map((item, key) => {
                return (
                  <Link
                    disabled={removedDuplicateMapel.some(
                      (removedItem) =>
                        removedItem.nama_mapel === item.nama_mapel
                    )}
                    key={key}
                    onClick={(e) => {
                      const hiddenInput =
                        e.target.querySelector("input[type=hidden]");
                      if (hiddenInput) {
                        setMapelId([...mapelId, item]);
                      }
                    }}
                    className="rounded-full border border-slate-300 p-2 hover:bg-slate-100 h-fit disabled:bg-slate-50"
                  >
                    <h1 className="inline">{item.nama_mapel}</h1>
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
