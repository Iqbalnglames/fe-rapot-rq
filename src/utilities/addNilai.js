import axios from "axios"

export const AddNilai = ({slug, formData}) => {
    axios.post(`https://api.rapot.techbatchtech.my.id/api/rapot/add/${slug}`, formData)
}