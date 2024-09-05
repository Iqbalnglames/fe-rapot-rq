import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSantriData } from "../../utilities/fetchSantriData";
import { AddNilai } from "../../utilities/addNilai";

export const AddNilaiSantri = () => {
  const { slug, slugMapel } = useParams();
  const [mapel, setMapel] = useState([]);
  const [semester, setSemester] = useState(
    sessionStorage.getItem("semester") || ""
  );
  const [santri, setSantri] = useState([]);
  const [rapotData, setRapotData] = useState({});
  const [choosedMapel, setChoosedMapel] = useState("");
  const [tugas1, setTugas1] = useState("");
  const [tugas2, setTugas2] = useState("");
  const [tugas3, setTugas3] = useState("");
  const [UTS, setUTS] = useState("");
  const [UAS, setUAS] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const navigate = useNavigate();

  console.log(semester);

  const handleChangeSemester = (e) => {
    setSemester(e.target.value);
    sessionStorage.setItem("semester", e.target.value);
  };

  const handleAddNilai = async (e) => {
    e.preventDefault();

    setisLoading(true);

    const formData = new FormData();

    formData.append("tugas_1", tugas1);
    formData.append("tugas_2", tugas2);
    formData.append("tugas_3", tugas3);
    formData.append("UTS", UTS);
    formData.append("UAS", UAS);

    AddNilai(slug, formData).then(() => {
      setisLoading(false);
      if (!isComplete) {
        navigate("/rapot");
      }
    });
  };

  const fetchDetailMapel = async () => {
    try {
      const url = slugMapel
        ? `http://127.0.0.1:8000/api/mapel/${slugMapel}`
        : "http://127.0.0.1:8000/api/mapel";
      const res = await axios.get(url);

      if (res.data && res.data.data) {
        setMapel(res.data.data);
      } else {
        console.warn("No mapel data found in the response.");
      }
    } catch (error) {
      console.error("Error fetching mapel data:", error);
    }
  };

  const handleSantriData = async () => {
    await fetchSantriData().then((res) => {
      setSantri(res);
    });
  };

  const fetchRapotData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rapot/${slug}`)
      .then((data) => {
        setRapotData(data.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let filteredNilai = [];
  useEffect(() => {
    fetchDetailMapel();
    fetchRapotData();
    handleSantriData();
    sessionStorage.setItem("semester", semester);
  }, []);

  const NilaiInput = ({ rapotData, slugMapel, choosedMapel, semester }) => {
    filteredNilai = slugMapel
      ? rapotData.nilai?.filter(
          (nilai) =>
            nilai.mapel.nama_mapel === mapel.nama_mapel &&
            nilai.semester.nama_semester.replace(/\D/g, "") == semester
        )
      : rapotData.nilai?.filter(
          (nilai) =>
            nilai.mapel.id == choosedMapel &&
            nilai.semester.nama_semester.replace(/\D/g, "") == semester
        );

    if (!filteredNilai?.length) {
      return (
        <>
          <div className="flex space-x-2">
            <div className="flex flex-col">
              <span>tugas 1</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="tugas 1"
                onChange={(e) => setTugas1(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span>tugas 2</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="tugas 2"
                onChange={(e) => setTugas2(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span>tugas 3</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="tugas 3"
                onChange={(e) => setTugas3(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span>UTS</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="UAS"
                onChange={(e) => setUTS(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span>UAS</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="UAS"
                onChange={(e) => setUAS(e.target.value)}
              />
            </div>
          </div>
        </>
      );
    }
    return (
      <div>
        {filteredNilai.map((nilai) => (
          <div key={nilai.id} className="flex space-x-2">
            <div className="flex flex-col">
              <span>tugas 1</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="tugas 1"
                value={nilai.tugas_1}
              />
            </div>
            <div className="flex flex-col">
              <span>tugas 2</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="tugas 2"
                value={nilai.tugas_2}
              />
            </div>
            <div className="flex flex-col">
              <span>tugas 3</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="tugas 2"
                value={nilai.tugas_3}
              />
            </div>
            <div className="flex flex-col">
              <span>UTS</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="UAS"
                value={nilai.UTS}
              />
            </div>
            <div className="flex flex-col">
              <span>UAS</span>
              <input
                className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
                type="text"
                placeholder="UAS"
                value={nilai.UAS}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <h1>input Nilai Santri</h1>
      <div className="mb-2">
        <h1>Pindah ke data santri sebelumnya / selanjutnya</h1>
        <button className="p-2 hover:bg-slate-50 rounded border">
          <IoIosArrowBack />
        </button>
        <button className="p-2 rounded border hover:bg-slate-50">
          <IoIosArrowForward />
        </button>
      </div>
      <form
        action={!filteredNilai?.length ? handleAddNilai : null}
        className="flex flex-col border rounded-lg drop-shadow-lg bg-white p-4"
      >
        <span>Nama Santri</span>
        <input
          className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
          type="text"
          placeholder="Nama Santri"
          value={rapotData.nama}
        />
        <span>Kelas</span>
        <input
          className="p-2 border-b border-[#9e0000] outline-none focus:bg-[#f8efe5] focus:border-b-2"
          type="text"
          placeholder="Kelas"
          value={rapotData.kelas?.kelas}
        />
        <span>Mata Pelajaran</span>
        {slugMapel ? (
          <select
            className="p-2 focus:border-b-2  border-b border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
            name="mapel"
            onChange={(e) => setChoosedMapel(e.target.value)}
            id="mapelSlug"
            disabled
          >
            <option>-- pilih mapel --</option>
            {slugMapel !== undefined ? (
              <option selected value={mapel.id}>
                {mapel.nama_mapel}
              </option>
            ) : (
              mapel.map((category) => {
                return category.mapel.map((mapelData) => {
                  return (
                    <>
                      <option value={mapelData.id}>
                        {mapelData.nama_mapel}
                      </option>
                    </>
                  );
                });
              })
            )}
          </select>
        ) : (
          <select
            className="p-2 focus:border-b-2  border-b border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
            name="mapel"
            onChange={(e) => setChoosedMapel(e.target.value)}
            id="mapelSlug"
          >
            <option>-- pilih mapel --</option>
            {mapel.map((category) => {
              return category.mapel.map((mapelData) => {
                return (
                  <>
                    <option value={mapelData.id}>{mapelData.nama_mapel}</option>
                  </>
                );
              });
            })}
          </select>
        )}
        <span>Semester</span>
        <select
          className="p-2 focus:border-b-2  border-b border-[#9e0000] outline-none bg-white focus:bg-[#f8efe5]"
          name="semester"
          onChange={handleChangeSemester}
        >
          <option disabled>-- pilih semester --</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>
        <h1>Nilai Santri</h1>
        <div className="lg:flex md:grid md:grid-cols-3 space-x-3">
          <NilaiInput
            rapotData={rapotData}
            slugMapel={slugMapel}
            choosedMapel={choosedMapel}
            semester={semester}
          />
        </div>
        <div className="mt-2 space-x-2">
          <button
            onClick={() => navigate("/rapot")}
            className="w-fit rounded h-fit p-2 bg-[#9e0000] text-[#f8efe5]"
          >
            Kembali
          </button>
          <button
            className="w-fit p-2 h-fit border-[#9e0000] border rounded text-[#9e0000] hover:bg-[#9e0000] hover:text-[#f8efe5]"
            type="submit"
          >
            Simpan Nilai
          </button>
        </div>
      </form>
    </>
  );
};
