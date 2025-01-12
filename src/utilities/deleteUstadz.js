import axios from "axios";

export const deleteData = async(slug) => {
    await axios.get(`https://rapot.api.techbatchtech.my.id/api/${slug}/delete`)
  }