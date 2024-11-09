import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const fetchUser = async() => {
    return await axios.get("http://localhost:8000/api/user")
}