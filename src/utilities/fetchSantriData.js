import axios from "axios";
export const fetchSantriData = async () => {
  try{
    const res = await axios.get("http://api.rapot.techbatchtech.my.id/api/santri");
    return res.data.data
  }catch(error){
    console.error("error mengambil data", error)
    return []
  }
  };
