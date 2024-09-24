import axios from "axios"

export const UpdateNilai = ({nilaiId, formData}) => {
    axios.post(`http://127.0.0.1:8000/api/rapot/${nilaiId}/update`, formData)
}