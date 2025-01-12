import axios from "axios";

export const fetchKelas = async () => {
    try {
      const res = await axios.get("https://rapot.api.techbatchtech.my.id/api/kelas");
      return res.data.data
    } catch (error) {
      console.error("Error fetching kelas:", error);
    }
  };