import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { fetchRapot } from "./../../utilities/fetchRapotAll";
import { FaPen } from "react-icons/fa";

export const Rapot = () => {
  const [open, setOpen] = useState(false);
  const [openMapel, setOpenMapel] = useState(false);
  const [mapel, setMapel] = useState([]);
  const [dataSantri, setDataSantri] = useState([]);
  const [choosedCategory, setChoosedCategory] = useState(
    localStorage.getItem("choosedCategory") || ""
  );
  const [mapelPilihan, setMapelPilihan] = useState();

  const headData = ["#", "Nama", "Kelas", "Penilaian", "Aksi"];

  const fetchMapel = async () => {
    await axios.get("http://127.0.0.1:8000/api/mapel").then((res) => {
      setMapel(res.data.data);
    });
  };

  const savedCategoryId = localStorage.getItem("choosedCategory");

  const fetchRapotData = async () => {
    await fetchRapot().then((res) => {
      setDataSantri(res);
    });
  };

  useEffect(() => {
    if (savedCategoryId) {
      setChoosedCategory(savedCategoryId);
    }
    fetchMapel();
    fetchRapotData();
  }, []);

  useEffect(() => {
    localStorage.setItem("choosedCategory", choosedCategory);
  }, [choosedCategory]);

  return (
    <>
      <h1 className="">List Nilai Santri</h1>
      <div>
        <span>Kategori Mapel</span>
        <select
          name="mapel"
          value={choosedCategory}
          onChange={(e) => {
            setChoosedCategory(e.target.value);
            localStorage.getItem("choosedCategory", e.target.value);
          }}
        >
          <option>--pilih kategori mapel--</option>
          {mapel.map((category) => {
            return (
              <>
                <option value={category.id}>{category.kategori_mapel}</option>
              </>
            );
          })}
        </select>
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
          {choosedCategory !== ""
            ? dataSantri?.map((data, index) => {
                return (
                  <tbody key={index} className="text-center">
                    <tr className="bg-white hover:bg-[#f8efe5] border-b hover:text-[#9e0000] transition duration-300 ease-in-out">
                      <td className="py-4 px-2"> {index + 1}</td>
                      <td className="text-left"> {data.nama}</td>
                      <td> {data.kelas.kelas}</td>
                      <td className="items-center w-1/3">
                        <tr className="">
                          <th className="px-4">Mapel</th>                          
                          <th className="px-4">tugas 1</th>                          
                          <th className="px-4">tugas 2</th>                          
                          <th className="px-4">tugas 3</th>                          
                          <th className="px-4">UTS</th>                          
                          <th className="px-4">UAS</th>                          
                        </tr>
                        {data.nilai?.map((res) => {
                          return (
                            <>
                              {res.mapel.kategori_mapel_id ==
                              choosedCategory ? (
                                <>
                                  <tr>
                                    <td>{res.mapel.nama_mapel}</td>
                                    <td>{res.tugas_1}</td>
                                    <td>{res.tugas_2}</td>
                                    <td>{res.tugas_3}</td>
                                    <td>{res.UTS}</td>
                                    <td>{res.UAS}</td>
                                  </tr>
                                </>
                              ) : null}
                            </>
                          );
                        })}
                      </td>
                      <td>
                        <Link
                          to={"/add-rapot"}
                          className="border hover:bg-[#9e0000] rounded-md hover:text-[#f8efe5] p-2"
                        >
                          <FaPen className="inline" />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            : null}
        </table>
      </div>
    </>
  );
};
