import axios from "axios";

export const fetchKelasSantri = async (kelas) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/kelas/${kelas}`);
      return res.data.data
    } catch (error) {
      console.error("Error fetching kelas:", error);
    }
  };