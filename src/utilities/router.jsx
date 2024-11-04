import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "../assets/Pages/dashboard";
import { Rapot } from "../assets/Pages/rapot";
import { Santri } from "../assets/Pages/santri";
import { Kelas } from "../assets/Pages/kelas";
import { AddSantriData } from "../assets/Pages/addSantri";
import { DetailRapot } from "../assets/Pages/detailRapot";
import { AddNilaiSantri } from "../assets/Pages/addNilaiSantri";
import { Asatidzah } from "../assets/Pages/asatidzah";
import { AddUstadzData } from "../assets/Pages/addUstadz";
import { AddRole } from "../assets/Pages/addRole";
import { Pendataan } from "../assets/Pages/pendataan";
import { AddMapelData } from "../assets/Pages/addMapelData";
import { AddRoleData } from "../assets/Pages/addRoleData";
import { AddMapelAjar } from "../assets/Pages/addMapelAjar";
import { AddTajarData } from "../assets/Pages/addTajar";
import { AddKategoriMapel } from "../assets/Pages/addKategoriMapel";
import { Profile } from "../assets/Pages/profile";
import { ProfileEdit } from "../assets/Pages/changeProfileData";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="profile/ubah-profile/:slug" element={<ProfileEdit />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/rapot" element={<Rapot />} />
      <Route path="/pendataan" element={<Pendataan />} />
      <Route path="/pendataan/tambah-data-mapel" element={<AddMapelData />} />
      <Route path="/pendataan/tambah-data-role" element={<AddRoleData />} />
      <Route path="/pendataan/tambah-tahun-ajaran" element={<AddTajarData />} />
      <Route
        path="/pendataan/tambah-kategori-mapel"
        element={<AddKategoriMapel />}
      />
      <Route path="/asatidzah" element={<Asatidzah />} />
      <Route path="/santri" element={<Santri />} />
      <Route path="/kelas" element={<Kelas />} />
      <Route path="/tambah-santri" element={<AddSantriData />} />
      <Route path="/tambah-ustadz" element={<AddUstadzData />} />
      <Route path="/tambah-role/:slug" element={<AddRole />} />
      <Route path="/tambah-mapel-ajar/:slug" element={<AddMapelAjar />} />
      <Route
        path="/detail-rapot/:slug/:tahunAjaran/:semester/:ujian"
        element={<DetailRapot />}
      />
      <Route path="/add-rapot/:slug/:slugMapel?" element={<AddNilaiSantri />} />
      <Route
        path="/update-rapot/:slug/:slugMapel?"
        element={<AddNilaiSantri />}
      />
    </Routes>
  );
};
