import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/alert";
import { TbChecklist } from "react-icons/tb";

export const AddMapelData = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [kelasData, setKelasData] = useState([]);
  const [kelasId, setKelasId] = useState([]);
  const [isSended, setIsSended] = useState(false);
  const [validation, setValidation] = useState(false);
  const [data, setData] = useState({
    nama_mapel: "",
    kategori_mapel_id: "",
  });

  const handleFetchMapelCategory = async () => {
    await axios.get("https://rapot.api.techbatchtech.my.id/api/kategori-mapel").then((res) => {
      setCategoryData(res.data.data);
    });
  };

  const handleFetchKelas = async () => {
    await axios.get("https://rapot.api.techbatchtech.my.id/api/kelas").then((res) => {
      setKelasData(res.data.data);
    });
  };

  const removeDuplicateClass = kelasId.filter(
    (item, index) => kelasId.indexOf(item) === index
  );

  const finalClassData = removeDuplicateClass.map((item) => {
    return item.id;
  });

  const handleSubmitData = async (eve) => {
    eve.preventDefault();
    const formData = new FormData();

    formData.append("nama_mapel", data.nama_mapel);
    formData.append("kategori_mapel_id", data.kategori_mapel_id);
    formData.append("kelas_id", JSON.stringify(finalClassData));

    await axios
      .post("https://rapot.api.techbatchtech.my.id/api/mapel", formData)
      .then(() => {
        setIsSended(true);
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  console.log(finalClassData);

  useEffect(() => {
    handleFetchMapelCategory();
    handleFetchKelas();
  }, []);

  return (
    <div>
      {isSended === true ? (
        <Alert
          icon={<TbChecklist />}
          pesan={"data berhasil dikirimkan"}
          pathA={"/pendataan"}
          buttonA={"Kembali ke menu"}
          pathB={() => setIsSended(false)}
          buttonB={"tambah lagi"}
        />
      ) : (
        ""
      )}
      {validation && (
        <Alert
          icon={<TbChecklist />}
          pesan={validation.nama_mapel[0]}
          pathB={() => setValidation(!validation)}
          buttonB={"tutup"}
        />
      )}
      <h1 className="text-center font-bold text-lg">
        Tambah mata pelajaran baru
      </h1>
      <form onSubmit={handleSubmitData} method="post">
        <div className="grid grid-cols space-y-2 rounded border border-slate-200 drop-shadow-xl bg-white p-4 mt-4">
          <span>Nama Mapel</span>
          <input
            className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
            type="text"
            placeholder="nama mata pelajaran"
            onChange={(e) => setData({ ...data, nama_mapel: e.target.value })}
          />
          <span>Pilih Kelas Mapel</span>
          <div className="flex lg:space-x-2 space-y-4 lg:space-y-0 p-2 border flex-col lg:flex-row border-slate-300 rounded lg:h-32">
            {kelasId.length !== 0
              ? removeDuplicateClass.map((item, key) => {
                  return (
                    <div key={key}>
                      <div
                        onClick={() =>
                          setKelasId(
                            removeDuplicateClass.filter((_, k) => k !== key)
                          )
                        }
                        className="rounded-full w-fit border bg-white border-slate-300 p-2 hover:bg-slate-100 h-fit cursor-pointer"
                      >
                        <h1 className="inline text-slate-500">X</h1>{" "}
                        <h1 className="inline">{item.kelas}</h1>
                        <input type="hidden" value={item.id} />
                      </div>
                    </div>
                  );
                })
              : "belum ada kelas yang dipilih"}
          </div>
          <div className="flex lg:space-x-2 space-y-4 lg:space-y-0 flex-col lg:flex-row">
            {kelasData.map((res) => {
              return (
                <>
                  <div
                    onClick={(e) => {
                      const hiddenInput =
                        e.target.querySelector("input[type=hidden]");
                      if (hiddenInput) {
                        setKelasId([...kelasId, res]);
                      }
                    }}
                    className="rounded-full w-fit border border-slate-300 p-2 hover:bg-slate-100 h-fit cursor-pointer"
                  >
                    <h1 className="inline">{res.kelas}</h1>
                    <input type="hidden" value={res.id} />
                  </div>
                </>
              );
            })}
          </div>
          <span>Kategori Mapel</span>
          <select
            name="kategori mapel"
            id=""
            className="p-2 rounded border border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
            onChange={(e) =>
              setData({ ...data, kategori_mapel_id: e.target.value })
            }
          >
            <option value="">--pilih kategori mapel--</option>
            {categoryData.map((res) => {
              return (
                <>
                  <option value={res.id}>{res.kategori_mapel}</option>
                </>
              );
            })}
          </select>
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
