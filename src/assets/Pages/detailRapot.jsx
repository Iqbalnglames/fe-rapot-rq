import axios from "axios";
import { useEffect, useState } from "react";
import { char } from "../../utilities/intToChar";
import { useParams } from "react-router-dom";

export const DetailRapot = () => {
  const [rapotData, setRapotData] = useState({});
  const [kelas, setKelas] = useState();
  const [mapel, setMapel] = useState([]);
  const [nilai, setNilai] = useState([]);

  const { slug, semester, ujian } = useParams();

  const dateData = new Date();
  const dateFormatter = new Intl.DateTimeFormat("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const currentDate = dateFormatter.format(dateData);

  const fetchMapel = async () => {
    await axios.get("http://127.0.0.1:8000/api/kategori-mapel").then((res) => {
      setMapel(res.data.data);
    });
  };

  const fetchRapotData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rapot/${slug}`)
      .then((data) => {
        setRapotData(data.data.data);
        setKelas(data.data.data.kelas.kelas);
        setNilai(data.data.data.nilai);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchRapotData();
    fetchMapel();
  }, []);

  const sortNilaiMapelByName = (dataRapot, mapelCategories) => {
    const mapelDataMap = new Map();

    dataRapot.forEach((data) => {
      mapelDataMap.set(data.mapel?.nama_mapel, data);
    });

    const categoryMapelMap = new Map();
    mapelCategories.forEach((category) => {
      categoryMapelMap.set(
        category.kategori_mapel,
        category.mapel.map((mapel) => mapel.nama_mapel).sort()
      );
    });

    const sortedData = [];
    mapelCategories.forEach((category) => {
      categoryMapelMap.get(category.kategori_mapel).forEach((mapelName) => {
        const nilai = mapelDataMap.get(mapelName);
        if (nilai) {
          sortedData.push(nilai);
        }
      });
    });
    return sortedData;
  };

  function getGrade(nilai) {
    if (nilai > 90) return "Sangat Baik";
    if (nilai > 75) return "Baik";
    if (nilai > 60) return "Cukup";
    return "Kurang";
  }

  const sortedDataNilai = sortNilaiMapelByName(nilai, mapel);

  // console.log(mapel.map(category => category.mapel.kelas?.some(kelas => kelas.id === rapotData.kelas.id)))
  console.log(
    mapel.map((category) =>
      category.mapel.map((mapel) => {
        if (
          mapel.kelas.some((kelas) => kelas.id === rapotData.kelas.id) === true
        ) {
          return mapel.nama_mapel;
        } else {
          return null;
        }
      })
    )
  );

  return (
    <>
      <div className="w-[21cm] h-[29.7cm] border-2 border-black p-[5mm]">
        <header className="flex justify-center space-x-2 border-b-2 border-black">
          <img
            width={105}
            height={80}
            src="https://raudhatulquran.com/wp-content/uploads/2023/08/LOGO-RQ-e1692688413673.png"
            alt="logo rq"
          />
          <div className="font-bold text-center">
            <h1>PONDOK PESANTREN RAUDHATUL QURAN</h1>
            <h1>
              MADRASAH{" "}
              {kelas?.replace(/\D/g, "") > 9 ? "ALIYAH" : "SALAFIYAH WUSTHA"}
            </h1>
            <h1>
              LAPORAN HASIL PENILAIAN {ujian === "UTS" ? "TENGAH" : "AKHIR"}{" "}
              SEMESTER
            </h1>
            <p className="font-light">
              Alamat : Nengahan, RT 02/ RW 04,Desa Nengahan, Kecamatan Bayat,
              Klaten, Jawa Tengah
            </p>
          </div>
        </header>
        <article className="mt-3">
          <div className="flex justify-between">
            <table>
              <tr>
                <td>
                  <h1>Nama Peserta Didik</h1>
                </td>
                <td className="font-bold"> : {rapotData.nama}</td>
              </tr>
              <tr>
                <td>
                  <h1>NISN </h1>
                </td>
                <td className="font-bold"> : {rapotData.NIS}</td>
              </tr>
              <tr>
                <td>
                  <h1>Nama Madrasah </h1>
                </td>
                <td className="font-bold">
                  {" "}
                  : {kelas?.replace(/\D/g, "") > 9 ? "MA" : "MSW"} RAUDHATUL
                  QUR`AN 1
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <td>
                  <h1>Kelas / Semester</h1>
                </td>
                <td className="font-bold">
                  {" "}
                  : {kelas?.replace(/\D/g, "")}/
                  {semester.replace(/\D/g, "") == 2 ? "Genap" : "Ganjil"}
                </td>
              </tr>
              <tr>
                <td>
                  <h1>Tahun Pelajaran </h1>
                </td>
                <td className="font-bold"> : 2023/2024</td>
              </tr>
              <tr>
                <h1 className="text-transparent">..</h1>
              </tr>
            </table>
          </div>
          <table className="border-2 w-full border-black space-x-4 border-collapse text-center text-xs mt-10">
            <thead className="">
              <tr className="border border-black">
                <th className="border border-black font-normal" rowSpan={2}>
                  No
                </th>
                <th className="border border-black font-normal" rowSpan={2}>
                  Mata Pelajaran
                </th>
                <th className="border border-black font-normal" rowSpan={2}>
                  KKM
                </th>
                <th
                  className="border border-black font-normal h-12"
                  colSpan={2}
                >
                  Nilai Hasil Belajar
                </th>
                <th className="border border-black font-normal" colSpan={2}>
                  Sikap
                </th>
              </tr>
              <tr>
                <th className="border border-black font-normal">Angka</th>
                <th className="w-96 border border-black font-normal">Huruf</th>
                <th className="font-normal border border-black">Predikat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-bold">
                <td className="border-black border">A</td>
                <td className="border border-black text-left">
                  Mata Pelajaran
                </td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
              </tr>
              {mapel.map((category, key) => {
                return (
                  <>
                    <tr key={key}>
                      <td className="border border-black">{key + 1}</td>
                      <td className="border border-black text-left font-bold">
                        {category.kategori_mapel}
                      </td>
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                    </tr>
                    {category.mapel
                      .sort((a, b) => {
                        if (a.nama_mapel < b.nama_mapel) {
                          return -1;
                        }
                        if (a.nama_mapel > b.nama_mapel) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((i, k) => {
                        if (
                          i.kelas.some(
                            (kelas) => kelas.id === rapotData.kelas.id
                          ) === true
                        ) {
                          return (
                            <tr key={k}>
                              <td></td>
                              <td className="text-left border-black border">
                                {(k + 10).toString(36)}. {i.nama_mapel}
                              </td>
                              <td className="border-black border">
                                {rapotData.kelas.kkm}
                              </td>
                              {sortedDataNilai.length !== 0 ? (
                                sortedDataNilai
                                  ?.filter(
                                    (res) =>
                                      res.mapel.nama_mapel === i.nama_mapel &&
                                      res.semester.slug === semester
                                  )
                                  .map((res) => {
                                    return (
                                      <>
                                        <td className="border border-black">
                                          {ujian === "UTS"
                                            ? res.UTS
                                            : res.total}
                                        </td>
                                        <td className="border border-black">
                                          {char(res.total)}
                                        </td>
                                        <td className="border-black border">
                                          {getGrade(res.total)}
                                        </td>
                                      </>
                                    );
                                  })
                              ) : (
                                <>
                                  <td className="border border-black">-</td>
                                  <td className="border border-black">
                                    Belum Ada Nilai
                                  </td>
                                  <td className="border-black border">
                                    Belum Ada Nilai
                                  </td>
                                </>
                              )}
                            </tr>
                          );
                        } else {
                          ("");
                        }
                      })}
                  </>
                );
              })}
            </tbody>
          </table>
          <h1 className="mt-5">Ketidakhadiran</h1>
          <table className="border-2 w-full border-black space-x-4 border-collapse text-center text-xs">
            <thead>
              <tr>
                <td className="border w-10 border-black font-normal">No</td>
                <td className="border border-black font-normal w-[230px]">
                  Alasan Ketidakhadiran
                </td>
                <td className="border border-black font-normal">Keterangan</td>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-black">
                <td className="border border-black">1</td>
                <td className="border border-black text-left">Sakit</td>
                <td className="border border-black">-</td>
              </tr>
              <tr className="border border-black">
                <td className="border border-black">1</td>
                <td className="border border-black text-left">Ijin</td>
                <td className="border border-black">-</td>
              </tr>
              <tr className="border border-black">
                <td className="border border-black">1</td>
                <td className="border border-black text-left">
                  Tanpa Keterangan
                </td>
                <td className="border border-black">-</td>
              </tr>
            </tbody>
          </table>
          <div className="p-1 border-2 border-black mt-5">
            <h1>catatan wali kelas:</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolor
              sint iste veniam quam alias quo, blanditiis aliquam, sit mollitia
              totam magnam adipisci aliquid id. Aliquid, ipsa enim. Numquam
              alias libero laboriosam iure maxime laborum molestiae provident
              blanditiis quam aliquid.
            </p>
          </div>
          <div className="mt-5">
            <h1 className="text-right mr-[126px]">Klaten, {currentDate}</h1>
          </div>
          <table className="w-full">
            <tr>
              <td>
                <div>
                  <div>
                    <h1>
                      orang Tua / wali <br />
                      peserta didik
                    </h1>
                  </div>
                  <div>ttd di sini</div>
                  <p>...................</p>
                </div>
              </td>
              <td>
                <div>
                  <div>
                    <h1>
                      <br />
                      Wali Kelas
                    </h1>
                  </div>
                  <div>tdd di sini</div>
                  <p>John Doe</p>
                </div>
              </td>
              <td>
                <div>
                  <div>
                    <h1>
                      <br />
                      Kepala Madrasah
                    </h1>
                  </div>
                  <div>ttd di sini</div>
                  <p>John Doe</p>
                </div>
              </td>
            </tr>
          </table>
        </article>
      </div>
    </>
  );
};
