import axios from "axios";

export const fetchRapot = async (kelas) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/nilai/${kelas}`);
    return res.data.data.santri;
  } catch (error) {
    console.error("error fetching rapot:", error);
  }
};