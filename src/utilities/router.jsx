import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from "../assets/Pages/dashboard"
import { Rapot } from "../assets/Pages/rapot"
import { Santri } from "../assets/Pages/santri"

export const Navigation = () => {
    return(
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rapot" element={<Rapot />} />
            <Route path="/santri" element={<Santri />} />
        </Routes>
    )
}