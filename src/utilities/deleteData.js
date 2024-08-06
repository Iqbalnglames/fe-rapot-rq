import axios from "axios";

export const deleteData = async(slug) => {
    await axios.delete(`http://127.0.0.1:8000/api/santri/${slug}/delete`)
  }