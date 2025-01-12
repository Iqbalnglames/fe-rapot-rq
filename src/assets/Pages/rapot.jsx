import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRapot } from "./../../utilities/fetchRapotAll";
import { FaPen, FaPrint } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { fetchUser } from "../../utilities/fetchUser";
import { DetailRapot } from "./detailRapot";
import { Print } from "../../components/print";
import { useReactToPrint } from "react-to-print";
// import printJS from "print-js";
// import { jsPDF } from "jspdf";
// import domtoimage from "dom-to-image";
// import htmlToPdfmake from "html-to-pdfmake";

export const Rapot = () => {
  const [mapel, setMapel] = useState([]);
  const [dataSantri, setDataSantri] = useState([]);
  const [tajar, setTajar] = useState([]);
  const [semester, setSemester] = useState(
    sessionStorage.getItem("semester") || ""
  );
  const [choosedCategory, setChoosedCategory] = useState(
    sessionStorage.getItem("choosedCategory") || ""
  );
  const [mapelPilihan, setMapelPilihan] = useState(
    sessionStorage.getItem("choosedMapel") || ""
  );
  const [tajarPilihan, setTajarPilihan] = useState(
    sessionStorage.getItem("tahunAjaran") || ""
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isPrintend, setIsPrinted] = useState(false);
  const [isAlerted, setIsAlerted] = useState(false);
  const [slugNama, setSlugNama] = useState("");
  const [user, setUser] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [ujian, setUjian] = useState("");
  const [choosedClass, setChoosedKelas] = useState(
    sessionStorage.getItem("choosedClass") || ""
  );
  const [tajarText, setTajarText] = useState(
    "" || sessionStorage.getItem("tajarText")
  );
  const headData = ["No", "Nama", "Kelas", "Penilaian", "Aksi"];

  const fetchMapel = async () => {
    await axios.get("http://127.0.0.1:8000/api/kategori-mapel").then((res) => {
      setMapel(res.data.data);
    });
  };

  const fetchTajar = async () => {
    await axios.get("http://127.0.0.1:8000/api/tahun-ajaran").then((res) => {
      setTajar(res.data.data);
    });
  };

  const savedCategoryId = sessionStorage.getItem("choosedCategory");

  const loadingItems = [];
  for (const head of headData) {
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

  const fetchRapotData = (kelas) => {
    setIsLoading(true);
    fetchRapot(kelas).then((res) => {
      setDataSantri(res);
      setIsLoading(false);
    });
  };

  const handleCategoryChange = (event) => {
    setChoosedCategory(event.target.value);
    sessionStorage.setItem("choosedCategory", event.target.value);
    setMapelPilihan("");
  };

  const handleShowRapotUts = () => {
    setUjian("UTS");
    setShowDetail(!showDetail);
    setIsAlerted(!isAlerted);
  };
  const handleShowRapotUas = () => {
    setUjian("UAS");
    setShowDetail(!showDetail);
    setIsAlerted(!isAlerted);
  };

  const handleTajarChange = (event) => {
    setTajarPilihan(event.target.value);
    setTajarText(
      event.target.options[event.target.selectedIndex].text.replace(/\//, "-")
    );
    sessionStorage.setItem(
      "tajarText",
      event.target.options[event.target.selectedIndex].text.replace(/\//, "-")
    );
    sessionStorage.setItem("tahunAjaran", event.target.value);
    setSemester("");
  };

  const resetFilter = () => {
    setChoosedCategory("");
    setChoosedKelas("");
    setMapelPilihan("");
    setSemester("");
    setTajarPilihan("");
    sessionStorage.setItem("choosedMapel", "");
    sessionStorage.setItem("choosedCategory", "");
    sessionStorage.setItem("semester", "");
    sessionStorage.setItem("tahunAjaran", "");
    sessionStorage.setItem("choosedClass", "");
  };

  const handleMapelChange = (event) => {
    setMapelPilihan(event.target.value);
    sessionStorage.setItem("choosedMapel", event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    sessionStorage.setItem("semester", event.target.value);
  };

  const handleChangeKelas = (event) => {
    setChoosedKelas(event.target.value);
    if (sessionStorage.getItem("classUser") === "") {
      sessionStorage.setItem(
        "choosedClass",
        sessionStorage.getItem("classUser")
      );
    } else {
      sessionStorage.setItem("choosedClass", event.target.value);
    }
  };

  const contentRef = useRef();
  const printElement = useReactToPrint({ contentRef });

  const escKey = (event) => {
    if (event.key === "Escape" && isAlerted === true) {
      setIsAlerted(!isAlerted);
    }
  };

  const kelasArray = [];

  user.roles?.some((role) => role.nama_role === "Wali Kelas") === true
    ? kelasArray.push(user.kelas)
    : null;

  user.mapels?.map((mapel) =>
    mapel.kelas.map((kelas) => kelasArray.push(kelas))
  );

  const mergeredKelas = kelasArray.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );

  const sortedMergedKelas = mergeredKelas.sort((a, b) => a.id - b.id);

  useEffect(() => {
    fetchUser().then((res) => {
      setUser(res.data);
    });
    fetchRapotData(choosedClass);

    if (savedCategoryId) {
      setChoosedCategory(savedCategoryId);
    }
    fetchMapel();
    fetchTajar();
  }, [choosedClass]);

  useEffect(() => {
    sessionStorage.setItem("choosedCategory", choosedCategory);
  }, [choosedCategory]);

  console.log(dataSantri);

  return (
    <>
      <Print
        icon={<LuFileSpreadsheet />}
        display={isAlerted ? "absolute" : "hidden"}
        pesan="Pilih rapot yang akan dicetak"
        pathA={handleShowRapotUts}
        pathB={handleShowRapotUas}
        buttonA="Rapot UTS"
        buttonB="Rapot UAS"
      />
      {showDetail ? (
        <div
          className={`transition-all duration-300 ease-in-out ${
            showDetail ? "opacity-100 visible" : "opacity-0 invisible"
          }  bg-white w-[222mm] border border-gray-400 drop-shadow-lg rounded-lg absolute top-5 bottom-5 z-50 left-[30%] right-5`}
        >
          <div className="w-fit h-[95%] overflow-scroll p-5">
            <DetailRapot
              slugNama={slugNama}
              ujian={ujian}
              tajarText={tajarText}
              semester={semester}
              printRef={contentRef}
            />
          </div>
          <div className="flex w-full justify-center space-x-2">
            <button
              onClick={() => printElement()}
              className="bg-[#9e0000] p-2 rounded text-center text-white hover:bg-[#852323]"
            >
              {isPrintend === false ? (
                "Cetak"
              ) : (
                <>
                  <svg className="loader inline" viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                  </svg>
                  Loading...
                </>
              )}
            </button>
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="text-[#9e0000] border border-[#9e0000] hover:bg-[#9e0000] hover:text-white p-2 rounded text-center"
            >
              Tutup
            </button>
          </div>
        </div>
      ) : null}
      <h1 className="text-center font-bold">List Nilai Santri</h1>
      <div className="lg:flex lg:justify-end">
        <div className="flex flex-col">
          <>
            <span>Pilih Kelas</span>
            <select
              name="tajar"
              value={choosedClass}
              onChange={(event) => handleChangeKelas(event)}
              className="bg-white border p-2 rounded "
            >
              <option value="">-- Pilih Kelas --</option>
              {sortedMergedKelas.map((item) => {
                return (
                  <>
                    <option value={item.id}>{item.kelas}</option>
                  </>
                );
              })}
            </select>
          </>
        </div>

        <div className="lg:ml-4 flex flex-col">
          <>
            <span>Pilih Tahun Ajaran</span>
            <select
              name="tajar"
              value={tajarPilihan}
              onChange={handleTajarChange}
              className="bg-white border p-2 rounded "
            >
              <option value="">-- Pilih Tahun Ajaran --</option>
              {tajar.map((item) => {
                return (
                  <>
                    <option value={item.id}>{item.tajar}</option>
                  </>
                );
              })}
            </select>
          </>
        </div>
        {tajarPilihan !== "" ? (
          <div className="lg:ml-4 flex flex-col">
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
        ) : null}
        {semester !== "" ? (
          <div className="lg:ml-4 flex flex-col">
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
                  <option value={category.id}>{category.kategori_mapel}</option>
                );
              })}
            </select>
          </div>
        ) : null}
        {choosedCategory && semester !== "" ? (
          <div className="lg:ml-4 flex flex-col">
            <span>Pilih Mapel</span>
            <select
              name="mapel"
              value={mapelPilihan}
              onChange={handleMapelChange}
              className="bg-white border p-2 rounded "
            >
              <option value="">-- Semua Mapel --</option>
              {user.roles?.some(
                (role) =>
                  role.nama_role === "Admin" || role.nama_role === "Wali Kelas"
              ) === false
                ? user.mapels
                    .filter(
                      (mapel) => mapel.kategori_mapel_id == choosedCategory
                    )
                    .flatMap((mapel) => {
                      return (
                        <option key={mapel.id} value={mapel.nama_mapel}>
                          {mapel.nama_mapel}
                        </option>
                      );
                    })
                : mapel
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
          </div>
        ) : null}

        <button
          className="border mt-4 lg:mt-[24.5px] rounded h-fit p-[6.3px] lg:ml-4"
          onClick={resetFilter}
        >
          <MdFilterAltOff className="inline" /> Reset Filter
        </button>
      </div>
      <div className="mt-2 max-h-[75vh] min-h-96 overflow-scroll overflow-y-auto">
        <table className="min-w-full">
          <thead className="top-0 sticky bg-gray-200 border-b h-16">
            <tr>
              {headData.map((data, i) => {
                return (
                  <th className="min-w-20" key={i}>
                    {data}
                  </th>
                );
              })}
            </tr>
          </thead>
          {isLoading
            ? loadingItems
            : dataSantri?.map((data, i) => {
                return (
                  <tbody key={i} className="text-center">
                    <tr className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out">
                      <td className="py-4 px-2"> {i + 1}</td>
                      <td className="text-left px-2"> {data.nama}</td>
                      <td> {data.kelas.kelas}</td>
                      <td className="w-fit align-middle">
                        <tr className="">
                          <th className="border border-slate-200 px-4">
                            Mapel
                          </th>
                          <th className="border border-slate-200 px-4">
                            tugas 1
                          </th>
                          <th className="border border-slate-200 px-4">
                            tugas 2
                          </th>
                          <th className="border border-slate-200 px-4">
                            tugas 3
                          </th>
                          <th className="border border-slate-200 px-4">UTS</th>
                          <th className="border border-slate-200 px-4">UAS</th>
                          <th className="border border-slate-200 px-4">
                            Total
                          </th>
                          <th className="border border-slate-200 px-4">
                            Remedial
                          </th>
                        </tr>
                        {data.nilai
                          ?.filter((res) =>
                            user.roles?.some(
                              (role) =>
                                role.nama_role === "Admin" ||
                                role.nama_role === "Wali Kelas"
                            ) === false
                              ? (tajarPilihan === "" ||
                                  res.tahun_ajaran_id == tajarPilihan) &&
                                (choosedCategory === "" ||
                                  res.mapel.kategori_mapel_id ==
                                    choosedCategory) &&
                                res.mapel.nama_mapel === mapelPilihan &&
                                res.semester.nama_semester.replace(/\D/g, "") ==
                                  semester
                              : (tajarPilihan === "" ||
                                  res.tahun_ajaran_id == tajarPilihan) &&
                                (choosedCategory === "" ||
                                  res.mapel.kategori_mapel_id ==
                                    choosedCategory) &&
                                (mapelPilihan == "" ||
                                  res.mapel.nama_mapel === mapelPilihan) &&
                                res.semester.nama_semester.replace(/\D/g, "") ==
                                  semester
                          )
                          .map((res, i) => {
                            return (
                              <tr key={i}>
                                <td className="border border-slate-200 text-left">
                                  {res.mapel.nama_mapel}
                                </td>
                                <td className="border border-slate-200">
                                  {res.tugas_1}
                                </td>
                                <td className="border border-slate-200">
                                  {res.tugas_2}
                                </td>
                                <td className="border border-slate-200">
                                  {res.tugas_3}
                                </td>
                                <td
                                  className={`border border-slate-200 ${
                                    res.UTS < data.kelas?.kkm
                                      ? "text-red-500"
                                      : ""
                                  }`}
                                >
                                  {res.UTS}
                                </td>
                                <td className="border border-slate-200">
                                  {res.UAS}
                                </td>
                                <td
                                  className={`border border-slate-200 ${
                                    res.UTS < data.kelas?.kkm
                                      ? "text-red-500"
                                      : ""
                                  }`}
                                >
                                  {res.total}
                                </td>
                                <td className="border border-slate-200">
                                  {res.isRemed == 1 ? "Ya" : "Tidak"}
                                </td>
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
                        {user.roles?.some(
                          (role) =>
                            role.nama_role === "admin" ||
                            role.nama_role === "Wali Kelas"
                        ) === true ? (
                          <Link
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
                          </Link>
                        ) : null}
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
