import { useEffect, useState } from "react";
import { Card } from "../../components/cards";
import axios from "axios";

export const Pendataan = () => {
  const [data, setData] = useState({
    categoryLength: "",
    roleLength: "",
    mapelLength: "",
    tahunAjaranLength: "",
  });

  const handleFetchMapelCategory = async () => {
    await axios.get("http://127.0.0.1:8000/api/kategori-mapel").then((res) => {
      const categoryLength = res.data.data.length;
      setData((prevData) => ({ ...prevData, categoryLength: categoryLength }));
    });
  };

  const handleFetchRole = async () => {
    await axios.get("http://127.0.0.1:8000/api/role").then((res) => {
      const roleLength = res.data.data.length;
      setData((prevData) => ({ ...prevData, roleLength: roleLength }));
    });
  };

  const handleFetchMapel = async () => {
    await axios.get("http://127.0.0.1:8000/api/mapel").then((res) => {
      const mapelLength = res.data.data.length;
      setData((prevData) => ({ ...prevData, mapelLength: mapelLength }));
    });
  };

  const handleFetchTajar = async () => {
    await axios.get("http://127.0.0.1:8000/api/tahun-ajaran").then((res) => {
      const tajarLength = res.data.data.length;
      setData((prevData) => ({ ...prevData, tahunAjaranLength: tajarLength }));
    });
  };

  useEffect(() => {
    handleFetchMapelCategory();
    handleFetchMapel();
    handleFetchRole();
    handleFetchTajar();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl">Pendataan</h1>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 items-center lg:items-start lg:space-x-2 mt-4">
        <Card
          jumlah={data.mapelLength === "" ? "Loading..." : data.mapelLength}
          terhitung={"jumlah mapel"}
          button={"tambah mapel"}
          path={"/pendataan/tambah-data-mapel"}
        />
        <Card
          jumlah={data.roleLength === "" ? "Loading..." : data.roleLength}
          terhitung={"jumlah role"}
          path={"/pendataan/tambah-data-role"}
          button={"tambah role"}
        />
        <Card
          jumlah={
            data.categoryLength === "" ? "Loading..." : data.categoryLength
          }
          path={"/pendataan/tambah-kategori-mapel"}
          terhitung={"jumlah kategori mapel"}
          button={"tambah kategori mapel"}
        />
        <Card
          jumlah={
            data.tahunAjaranLength === ""
              ? "Loading..."
              : data.tahunAjaranLength
          }
          terhitung={"Tahun Ajaran"}
          button={"tambah tahun ajaran"}
          path={"/pendataan/tambah-tahun-ajaran"}
        />
      </div>
    </div>
  );
};
