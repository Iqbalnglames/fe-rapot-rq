import { Card } from "./../../components/cards";

export const Dashboard = () => {
  const dataDummy = Array(20).fill('ini data dummy');
  return (
    <>
      <div className="">
        <h1 className="text-lg font-bold">Selamat datang di sirapot Raudhatul Quran</h1>
        <h1>Dashboard</h1>
        <div className="hidden lg:flex lg:justify-between mt-5">
          <Card jumlah={"120"} terhitung={"Total Santri"} />
          <Card jumlah={"24"} terhitung={"Total Mata Pelajaran"} />
          <Card jumlah={"27"} terhitung={"Total Asatidzah Terdaftar"} />
        </div>
        <div className="h-[49vh] mt-[2vh] overflow-scroll">
          <h1 className="font-bold text-lg">Aktifitas terbaru</h1>
        {dataDummy.map((item, key) => (
          <h1 key={key}>{item}</h1>
        ))}
        </div>
      </div>
    </>
  );
};
