import axios from "axios";

export const deleteData = async(slug) => {
    await axios.get(`http://api.rapot.techbatchtech.my.id/api/${slug}/delete`)
  }