import axios from "axios";
import { useEffect, useState } from "react";
import { char } from "../../utilities/intToChar";

export const DetailRapot = () => {
  const [rapotData, setRapotData] = useState({});
  const [kelas, setkelas] = useState();
  const [mapel, setMapel] = useState([]);
  const [nilai, setNilai] = useState([]);

  const fetchMapel = async () => {
    await axios.get("http://127.0.0.1:8000/api/mapel").then((res) => {
      setMapel(res.data.data);
    });
  };

  const fetchRapotData = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/rapot/muhammad-iqbal-tsabitul-azmi")
      .then((data) => {
        setRapotData(data.data.data);
        setkelas(data.data.data.kelas.kelas);
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
      mapelDataMap.set(data.mapel.nama_mapel, data);
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

  const sortedDataNilai = sortNilaiMapelByName(nilai, mapel);

  console.log(sortedDataNilai);

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
            <h1>MADRASAH SALAFIYAH WUSTHA</h1>
            <h1>LAPORAN HASIL UJIAN TENGAH SEMESTER</h1>
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
                <td className="font-bold"> : MSW RAUDHATUL QUR`AN 1</td>
              </tr>
            </table>
            <table>
              <tr>
                <td>
                  <h1>Kelas / Semester</h1>
                </td>
                <td className="font-bold"> : {kelas}</td>
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
          <table className="border w-full border-black space-x-4 border-collapse text-center text-xs mt-10">
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
              {mapel.map((category, k) => {
                return (
                  <>
                    <tr key={k}>
                      <td className="border border-black">{k+1}</td>
                      <td className="border border-black text-left">
                        {category.kategori_mapel}
                      </td>
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                      <td className="border border-black"></td>
                    </tr>
                    {sortedDataNilai.map((i, k) => {
                      if (i.mapel.kategori_mapel_id === category.id)
                        return (
                          <tr key={k}>
                            <td></td>
                            <td className="text-left border-black border">
                              {(k + 10).toString(36)}. {i.mapel.nama_mapel}
                            </td>
                            <td className="border-black border">70</td>
                            <td className="border border-black"> {i.UAS} </td>
                            <td className="border border-black">
                              {char(i.UAS)}
                            </td>
                            <td className="border-black border">Sangat Baik</td>
                          </tr>
                        );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </article>
      </div>
    </>
  );
};
