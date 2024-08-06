import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from "../assets/Pages/dashboard"
import { Rapot } from "../assets/Pages/rapot"
import { Santri } from "../assets/Pages/santri"
import { Kelas } from "../assets/Pages/kelas"
import { AddSantriData } from "../assets/Pages/addSantri"
import { DetailRapot } from "../assets/Pages/detailRapot"
import { NilaiSantri } from "../assets/Pages/nilaiSantri"

export const Navigation = () => {
    return(
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rapot" element={<Rapot />} />
            <Route path="/santri" element={<Santri />} />
            <Route path="/kelas" element={<Kelas />} />
            <Route path="/tambah-santri" element={<AddSantriData />} />
            <Route path="/detail-rapot" element={<DetailRapot />} />
            <Route path="/add-rapot" element={<NilaiSantri />} />
        </Routes>
    )
}