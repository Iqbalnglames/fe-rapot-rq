import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSantriData } from "./../../utilities/fetchSantriData";
import { AddNilai } from "../../utilities/addNilai";
import { UpdateNilai } from "../../utilities/updateNilai";
import { Alert } from "../../components/alert";
import { TbChecklist } from "react-icons/tb";

export const AddNilaiSantri = () => {
  const { slug, slugMapel } = useParams();
  const choosedCategory = sessionStorage.getItem("choosedCategory") || "";

  const [dataLoaded, setDataLoaded] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [santriData, setSantriData] = useState([]);
  const [detailSantri, setDetailSantri] = useState({});
  const [tahunAjaranData, setTahunAjaranData] = useState([]);
  const [nilaiId, setNilaiId] = useState("");
  const [semester, setSemester] = useState(
    sessionStorage.getItem("semester") || ""
  );
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [mapelData, setMapelData] = useState(!slugMapel ? [] : "");
  const [mapelId, setMapelId] = useState("");
  const [kkm, setKkm] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [nilai, setNilai] = useState({
    tugas1: "",
    tugas2: "",
    tugas3: "",
    uts: "",
    uas: "",
  });

  console.log(typeof slugMapel);

  // functions
  const fetchAllSantriData = async () => {
    await fetchSantriData().then((res) => {
      setSantriData(res);
    });
  };

  // fetch detail santri data
  const handleDetailSantri = async () => {
    await axios.get(`http://127.0.0.1:8000/api/rapot/${slug}`).then((res) => {
      setDetailSantri(res.data.data);
      setDataLoaded(true);
    });
  };

  // fetch tahun ajaran
  const fetchTahunAjaran = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tahun-ajaran");
      setTahunAjaranData(res.data.data);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };

  // fetch mapel name
  const fetchDetailMapel = async () => {
    try {
      const url = slugMapel
        ? `http://127.0.0.1:8000/api/mapel/${slugMapel}`
        : "http://127.0.0.1:8000/api/kategori-mapel";
      const res = await axios.get(url);

      if (res.data && res.data.data) {
        setMapelData(res.data.data);
        if (slugMapel) {
          setMapelId(res.data.data.id);
        }
      } else {
        console.warn("No mapel data found in the response.");
      }
    } catch (error) {
      console.error("Error fetching mapel data:", error);
    }
  };

  let filteredMapel = "";

  if (!slugMapel) {
    if (choosedCategory) {
      filteredMapel = mapelData
        .filter((category) => category.id == choosedCategory)
        .flatMap((category) => category.mapel);
    } else {
      filteredMapel = mapelData.flatMap((category) =>
        category.mapel.flatMap((mapel) => mapel)
      );
    }
    filteredMapel = filteredMapel.filter((mapel) =>
      mapel.kelas.some((kelas) => kelas.id === detailSantri.kelas?.id)
    );
  }

  const nilaiLabels = [
    { label: "Tugas 1", key: "tugas1" },
    { label: "Tugas 2", key: "tugas2" },
    { label: "Tugas 3", key: "tugas3" },
    { label: "UTS", key: "uts" },
    { label: "UAS", key: "uas" },
  ];

  // get input nilai value and pass to state
  const handleInputChange = (e, key) => {
    setNilai({
      ...nilai,
      [key]: e.target.value,
    });
  };

  // handle find kkm
  const handleMapelChange = (e) => {
    // simpen dulu barangkali ada client yang kkm nya sesuai mapel

    setMapelId(e.target.value);
    // const selectedId = e.target.value;
    // // const selectedData = Array.isArray(mapelData)
    // //   ? filteredMapel.find((data) => data.id === parseInt(selectedId))
    // //   : mapelData;
    // // // setKkm(selectedData.KKM);
  };

  const formData = new FormData();
  formData.append("kelas_id", detailSantri.kelas?.id);
  formData.append("semester_id", semester);
  formData.append("tahun_ajaran_id", tahunAjaran);
  formData.append("mapel_id", slugMapel ? mapelData.id : mapelId);
  // formData.append("kkm", kkm);
  formData.append("kkm", detailSantri.kelas?.kkm);
  formData.append("tugas_1", nilai.tugas1);
  formData.append("tugas_2", nilai.tugas2);
  formData.append("tugas_3", nilai.tugas3);
  formData.append("UTS", nilai.uts);
  formData.append("UAS", nilai.uas);

  // get old nilai from mapel
  const handleOldNilai = () => {
    // validate if nilai found
    setNilai({
      tugas1: "",
      tugas2: "",
      tugas3: "",
      uts: "",
      uas: "",
    });

    const filteredNilaiData = detailSantri.nilai?.filter(
      (nilai) =>
        nilai.mapel_id == (slugMapel ? mapelData.id : mapelId) &&
        nilai.tahun_ajaran_id == tahunAjaran &&
        nilai.semester_id == semester.replace(/\D/g, "")
    );

    if (filteredNilaiData.length !== 0) {
      setNilai({
        tugas1:
          filteredNilaiData[0].tugas_1 === null
            ? 0
            : filteredNilaiData[0].tugas_1,
        tugas2:
          filteredNilaiData[0].tugas_2 === null
            ? 0
            : filteredNilaiData[0].tugas_2,
        tugas3:
          filteredNilaiData[0].tugas_3 === null
            ? 0
            : filteredNilaiData[0].tugas_3,
        uts: filteredNilaiData[0].UTS === null ? 0 : filteredNilaiData[0].UTS,
        uas: filteredNilaiData[0].UAS === null ? 0 : filteredNilaiData[0].UAS,
      });
      setNilaiId(filteredNilaiData[0].id);
    }
  };

  // simplify all function before passing inside useEffect hook
  const fetchAllData = async () => {
    fetchDetailMapel();
    fetchAllSantriData();
    fetchTahunAjaran();
    handleDetailSantri();
  };

  // useEffect hook
  useEffect(() => {
    fetchAllData();
    handleDetailSantri();
    if (dataLoaded) {
      handleOldNilai();
    }
  }, [slugMapel, dataLoaded, isSubmitted]);

  // second useEffect hook
  useEffect(() => {
    if (slugMapel && mapelData && mapelData.KKM) {
      setKkm(mapelData.KKM);
      setMapelId(mapelData.id);
    }
    if (tahunAjaran != "" && mapelId != "" && semester != "") {
      handleOldNilai();
      if (isSubmitted === true) {
        handleOldNilai();
        setisSubmitted(false);
      }
    }
  }, [
    slugMapel,
    mapelData,
    tahunAjaran,
    isSubmitted,
    mapelId,
    nilaiId,
    semester,
  ]);

  // add nilai to database
  const handleAddNilai = (eve) => {
    eve.preventDefault();
    AddNilai({ slug, formData });
    setIsAdded(true);
    // alert("nilai berhasil ditambahkan");
  };

  const handleUpdateNilai = (eve) => {
    eve.preventDefault();

    if (formData) {
      setIsUpdated(true);
      UpdateNilai({ nilaiId, formData });
    }
    // alert("Nilai berhasil diupdate");
  };

  // submit data
  const handleSubmit = (eve) => {
    eve.preventDefault();

    const filteredNilaiData = detailSantri.nilai?.filter(
      (nilai) =>
        nilai.mapel_id == mapelId &&
        nilai.tahun_ajaran_id == tahunAjaran &&
        nilai.semester_id == semester.replace(/\D/g, "")
    );

    if (filteredNilaiData.length != 0) {
      handleUpdateNilai(eve);
    } else {
      handleAddNilai(eve);
    }

    handleDetailSantri();
    handleOldNilai();
    setisSubmitted(true);
  };

  // debugging zone

  // html component
  return (
    <>
      {isUpdated ? (
        <Alert
          icon={<TbChecklist />}
          pesan={"data berhasil diupdate"}
          pathA={"/penilaian"}
          buttonA={"Kembali"}
          pathB={() => setIsUpdated(!isUpdated)}
          buttonB={"Tambah lagi"}
        />
      ) : null}
      {isAdded ? (
        <Alert
          icon={<TbChecklist />}
          pesan={"data berhasil ditambahkan"}
          pathA={"/penilaian"}
          buttonA={"Kembali"}
          pathB={() => setIsAdded(!isAdded)}
          buttonB={"Tambah lagi"}
        />
      ) : null}

      <div className="p-3 border rounded border-gray-300 drop-shadow-md bg-white flex flex-col">
        <h1 className="text-center font-bold">Tambah Nilai</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <span>Nama Santri</span>
          <input
            type="text"
            placeholder="nama santri"
            className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
            value={detailSantri.nama}
            disabled
          />
          <span>Kelas</span>
          <input
            type="text"
            placeholder="nama kelas"
            className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
            disabled
            value={detailSantri.kelas?.kelas}
          />
          <span>Tahun Ajaran</span>
          <select
            onChange={(e) => setTahunAjaran(e.target.value)}
            name="tahun_ajaran"
            id=""
            className="p-2 rounded border border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
          >
            <option value="">--pilih tahun ajaran--</option>
            {tahunAjaranData.flatMap((item) => {
              return <option value={item.id}>{item.tajar}</option>;
            })}
          </select>
          <span>Semester</span>
          <select
            onChange={(e) => setSemester(e.target.value)}
            name="semester"
            id=""
            className="p-2 rounded border border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
          >
            <option value="">--pilih semester--</option>
            <option selected={semester == "1"} value="1">
              Semester 1
            </option>
            <option selected={semester == "2"} value="2">
              Semester 2
            </option>
          </select>
          <span>Mata Pelajaran</span>

          <select
            className="p-2 rounded border border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
            onChange={handleMapelChange}
            name="mapel"
            disabled={slugMapel ? true : false}
          >
            <option value="">--pilih mapel--</option>
            {Array.isArray(mapelData) ? (
              filteredMapel.flatMap((item) => {
                return (
                  <>
                    <option value={item.id}>{item.nama_mapel}</option>
                  </>
                );
              })
            ) : mapelData.kelas?.some(
                (kelas) => kelas.id === detailSantri.kelas?.id
              ) ? (
              <option selected value={mapelData.id}>
                {mapelData.nama_mapel}
              </option>
            ) : (
              <option selected>
                santri ini belum mempelajari mapel yang antum pilih
              </option>
            )}
          </select>
          <span>KKM</span>
          <input
            type="number"
            placeholder="KKM"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
            value={detailSantri.kelas?.kkm}
            onChange={(e) => setKkm(e.target.value)}
          />
          <label htmlFor="Nilai">Nilai</label>
          <div className="flex flex-col lg:flex-row lg:space-x-2">
            {nilaiLabels.map((item, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <span>{item.label}</span>
                  <input
                    type="number"
                    placeholder={item.label}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                    onChange={(e) => handleInputChange(e, item.key)}
                    value={nilai[item.key]}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex w-full">
            <Link
              className="p-2 border rounded mt-3 text-[#f8efe5] bg-[#9e0000]"
              to={"/penilaian"}
            >
              Kembali
            </Link>
            <button
              className="p-2 rounded mt-3 hover:text-[#f8efe5] hover:bg-[#9e0000] text-[#9e0000] border border-[#9e0000] disabled:text-[#852323] disabled:bg-slate-100"
              type="submit"
              disabled={
                slugMapel
                  ? mapelData.kelas?.some(
                      (kelas) => kelas.id === detailSantri.kelas?.id
                    )
                    ? false
                    : true
                  : null
              }
            >
              Simpan Nilai
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
