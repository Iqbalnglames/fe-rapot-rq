import axios from "axios";
export const fetchAsatidzahData = async () => {
  try{
    const res = await axios.get("http://127.0.0.1:8000/api/asatidzah");
    return res.data.data
  }catch(error){
    console.error("error mengambil data", error)
    return []
  }
  };