import axios from "axios"

export const UpdateNilai = ({nilaiId, formData}) => {
    axios.post(`https://api.rapot.techbatchtech.my.id/api/rapot/${nilaiId}/update`, formData)
}