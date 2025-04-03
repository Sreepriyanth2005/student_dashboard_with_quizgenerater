import React, { useState } from "react";
import axios from "axios";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    department: "",
    year: "",
    section: "",
    secretKey: "1111",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/students/register", formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="rollNumber" placeholder="Roll Number" onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
        <input type="text" name="year" placeholder="Year" onChange={handleChange} required />
        <input type="text" name="section" placeholder="Section" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
