import React, { useState } from "react";
import axios from "axios";

const TeacherRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    secretKey: "1111",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/teachers/register", formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <div>
      <h2>Teacher Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegister;
