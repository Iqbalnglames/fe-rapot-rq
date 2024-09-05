import axios from "axios"

export const UpdateNilai = ({id, formData}) => {
    axios.post(`http://127.0.0.1:8000/api/rapot/${id}/update`, formData)
}