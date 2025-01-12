import axios from "axios"

export const UpdateNilai = ({nilaiId, formData}) => {
    axios.post(`http://api.rapot.techbatchtech.my.id/api/rapot/${nilaiId}/update`, formData)
}