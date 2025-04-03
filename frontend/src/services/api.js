import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const studentLogin = (data) => API.post("/students/login", data);
export const studentRegister = (data) => API.post("/students/register", data);
export const teacherLogin = (data) => API.post("/teachers/login", data);
export const teacherRegister = (data) => API.post("/teachers/register", data);
