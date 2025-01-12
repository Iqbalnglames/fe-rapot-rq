import axios from "axios"

export const UpdateNilai = ({nilaiId, formData}) => {
    axios.post(`https://rapot.api.techbatchtech.my.id/api/rapot/${nilaiId}/update`, formData)
}