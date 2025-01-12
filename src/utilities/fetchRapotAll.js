import axios from "axios";

export const fetchRapot = async (kelas) => {
  try {
    const res = await axios.get(`https://api.rapot.techbatchtech.my.id/api/nilai/${kelas}`);
    return res.data.data.santri;
  } catch (error) {
    console.error("error fetching rapot:", error);
  }
};