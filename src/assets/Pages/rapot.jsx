import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRapot } from "./../../utilities/fetchRapotAll";
import { FaPen, FaPrint } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { Alert } from "../../components/alert";
import { LuFileSpreadsheet } from "react-icons/lu";

export const Rapot = () => {
  const [mapel, setMapel] = useState([]);
  const [dataSantri, setDataSantri] = useState([]);
  const [semester, setSemester] = useState(
    sessionStorage.getItem("semester") || ""
  );
  const [choosedCategory, setChoosedCategory] = useState(
    sessionStorage.getItem("choosedCategory") || ""
  );
  const [mapelPilihan, setMapelPilihan] = useState(
    sessionStorage.getItem("choosedMapel") || ""
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isAlerted, setIsAlerted] = useState(false);
  const [slugNama, setSlugNama] = useState("");

  const headData = ["#", "Nama", "Kelas", "Semester", "Penilaian", "Aksi"];

  const fetchMapel = async () => {
    await axios.get("http://127.0.0.1:8000/api/mapel").then((res) => {
      setMapel(res.data.data);
    });
  };

  const savedCategoryId = sessionStorage.getItem("choosedCategory");

  const loadingItems = [];
  for (let i = 0; i < headData.length; i++) {
    loadingItems.push(
      <td className="px-6 py-4 font-light whitespace-nowrap">
        <div className="bg-gray-300 rounded-lg w-40 h-2 animate-pulse"></div>
      </td>
    );
  }

  const handleShowAlert = (slug) => {
    setIsAlerted(!isAlerted);
    setSlugNama(slug);
  };

  const fetchRapotData = async () => {
    await fetchRapot().then((res) => {
      setDataSantri(res);
      setIsLoading(false);
    });
  };

  const handleCategoryChange = (event) => {
    setChoosedCategory(event.target.value);
    sessionStorage.setItem("choosedCategory", event.target.value);
    setMapelPilihan("");
  };

  const resetFilter = () => {
    setChoosedCategory("");
    setMapelPilihan("");
    setSemester("");
    sessionStorage.setItem("choosedMapel", "");
    sessionStorage.setItem("choosedCategory", "");
    sessionStorage.setItem("semester", "");
  };

  const handleMapelChange = (event) => {
    setMapelPilihan(event.target.value);
    sessionStorage.setItem("choosedMapel", event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    sessionStorage.setItem("semester", event.target.value);
  };

  const escKey = (event) => {
    if (event.key === "Escape" && isAlerted === true) {
      setIsAlerted(!isAlerted);
    }
  }

  useEffect(() => {
    
    if (savedCategoryId) {
      setChoosedCategory(savedCategoryId);
    }
    fetchMapel();
    fetchRapotData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("choosedCategory", choosedCategory);
  }, [choosedCategory]);

  return (
    <>
      <Alert
        icon={<LuFileSpreadsheet />}
        display={isAlerted ? "absolute" : "hidden"}
        pesan="Pilih rapot yang akan dicetak"
        pathA={`/detail-rapot/${slugNama}/semester-${semester}/UTS`}
        pathB={`/detail-rapot/${slugNama}/semester-${semester}/UAS`}
        buttonA="Rapot UTS"
        buttonB="Rapot UAS"
      />
      <h1 className="text-center font-bold">List Nilai Santri</h1>
      <div className="flex justify-end">
        <div className="flex flex-col">
          <>
            <span>Pilih Semester</span>
            <select
              name="mapel"
              value={semester}
              onChange={handleSemesterChange}
              className="bg-white border p-2 rounded "
            >
              <option value="">-- Pilih Semester --</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </>
        </div>
        {semester !== "" ? (
          <div className="ml-4 flex flex-col">
            <span>Kategori Mapel</span>
            <select
              name="category"
              value={choosedCategory}
              onChange={handleCategoryChange}
              className="bg-white border p-2 rounded"
            >
              <option value="">-- Kategori Mapel --</option>
              {mapel.map((category) => {
                return (
                  <>
                    <option value={category.id}>
                      {category.kategori_mapel}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        ) : null}
        {choosedCategory && semester !== "" ? (
          <div className="ml-4 flex flex-col">
            <>
              <span>Pilih Mapel</span>
              <select
                name="mapel"
                value={mapelPilihan}
                onChange={handleMapelChange}
                className="bg-white border p-2 rounded "
              >
                <option value="">-- Semua Mapel --</option>
                {mapel
                  ?.filter((category) => category.id == choosedCategory)
                  .flatMap((category) => category.mapel)
                  .map((mapel) => {
                    return (
                      <option key={mapel.id} value={mapel.nama_mapel}>
                        {mapel.nama_mapel}
                      </option>
                    );
                  })}
              </select>
            </>
          </div>
        ) : null}

        <button
          className="border mt-[24.5px] rounded h-fit p-[6.3px] ml-4"
          onClick={resetFilter}
        >
          <MdFilterAltOff className="inline" /> Reset Filter
        </button>
      </div>
      <div>
        <table className="mt-2 min-w-full">
          <thead className="top-0 sticky bg-gray-200 border-b h-16">
            <tr>
              {headData.map((data, i) => {
                return <th key={i}>{data}</th>;
              })}
            </tr>
          </thead>
          {isLoading
            ? loadingItems
            : dataSantri?.map((data, index) => {
                return (
                  <tbody key={index} className="text-center">
                    <tr className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out">
                      <td className="py-4 px-2"> {index + 1}</td>
                      <td className="text-left"> {data.nama}</td>
                      <td> {data.kelas.kelas}</td>
                      <td>
                        {semester !== ""
                          ? `semester ${semester}`
                          : "Pilih Semester"}
                      </td>
                      <td className="items-center w-1/3">
                        <tr className="">
                          <th className="px-4">Mapel</th>
                          <th className="px-4">tugas 1</th>
                          <th className="px-4">tugas 2</th>
                          <th className="px-4">tugas 3</th>
                          <th className="px-4">UTS</th>
                          <th className="px-4">UAS</th>
                        </tr>
                        {data.nilai
                          ?.filter(
                            (res) =>
                              (choosedCategory === "" ||
                                res.mapel.kategori_mapel_id ==
                                  choosedCategory) &&
                              (mapelPilihan === "" ||
                                res.mapel.nama_mapel === mapelPilihan) &&
                              res.semester.nama_semester.replace(/\D/g, "") ==
                                semester
                          )
                          .map((res, i) => {
                            return (
                              <tr key={i}>
                                <td>{res.mapel.nama_mapel}</td>
                                <td>{res.tugas_1}</td>
                                <td>{res.tugas_2}</td>
                                <td>{res.tugas_3}</td>
                                <td>{res.UTS}</td>
                                <td>{res.UAS}</td>
                              </tr>
                            );
                          })}
                      </td>
                      <td className="space-x-1">
                        <Link
                          to={`/add-rapot/${data.slug}/${mapelPilihan
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          className="border hover:bg-[#9e0000] rounded-md hover:text-[#f8efe5] p-2 relative group"
                        >
                          <FaPen className="inline" />
                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            tambah/update nilai
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            handleShowAlert(data.slug);
                          }}
                          onKeyDown={(e) => escKey(e)}
                          className="border hover:bg-[#9e0000] rounded-md hover:text-[#f8efe5] p-2 relative group"
                        >
                          <FaPrint className="inline" />
                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            cetak rapot
                          </div>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
        </table>
      </div>
    </>
  );
};
