import axios from "axios"

export const AddNilai = ({slug, formData}) => {
    axios.post(`http://api.rapot.techbatchtech.my.id/api/rapot/add/${slug}`, formData)
}