import axios from "axios";

export const deleteData = async(slug) => {
    await axios.get(`http://127.0.0.1:8000/api/${slug}/delete`)
  }