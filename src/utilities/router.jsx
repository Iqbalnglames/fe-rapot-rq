import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "../assets/Pages/dashboard";
import { Rapot } from "../assets/Pages/rapot";
import { Santri } from "../assets/Pages/santri";
import { Kelas } from "../assets/Pages/kelas";
import { AddSantriData } from "../assets/Pages/addSantri";
import { DetailRapot } from "../assets/Pages/detailRapot";
import { AddNilaiSantri } from "../assets/Pages/addNilaiSantri";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/rapot" element={<Rapot />} />
      <Route path="/santri" element={<Santri />} />
      <Route path="/kelas" element={<Kelas />} />
      <Route path="/tambah-santri" element={<AddSantriData />} />
      <Route path="/detail-rapot/:slug/:semester" element={<DetailRapot />} />
      <Route path="/add-rapot/:slug/:slugMapel?" element={<AddNilaiSantri />} />
    </Routes>
  );
};
