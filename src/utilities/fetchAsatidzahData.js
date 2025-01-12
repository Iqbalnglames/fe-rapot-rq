import axios from "axios";
export const fetchAsatidzahData = async () => {
  try{
    const res = await axios.get("https://rapot.api.techbatchtech.my.id/api/asatidzah");
    return res.data.data
  }catch(error){
    console.error("error mengambil data", error)
    return []
  }
  };