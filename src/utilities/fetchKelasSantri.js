import axios from "axios";

export const fetchKelasSantri = async (kelas) => {
    try {
      const res = await axios.get(`http://api.rapot.techbatchtech.my.id/api/kelas/${kelas}`);
      return res.data.data
    } catch (error) {
      console.error("Error fetching kelas:", error);
    }
  };