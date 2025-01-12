import axios from "axios"

export const AddNilai = ({slug, formData}) => {
    axios.post(`https://rapot.api.techbatchtech.my.id/api/rapot/add/${slug}`, formData)
}