import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const hrLogin = async (email, password) => {
    return axios.post(`${API_URL}/login-hr`, { email, password});
};

export const employeesList = async () => {
    return axios.get(`${API_URL}/hr/employees-list`);
};