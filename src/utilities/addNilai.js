import axios from "axios"

export const AddNilai = ({slug, formData}) => {
    axios.post(`http://127.0.0.1:8000/api/rapot/add/${slug}`, formData)
}