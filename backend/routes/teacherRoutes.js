const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const SECRET_KEY = process.env.SECRET_KEY || "1111"; 

// ✅ Teacher Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, department, secretKey } = req.body;

    if (secretKey !== SECRET_KEY) return res.status(403).json({ message: "Invalid secret key" });

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) return res.status(400).json({ message: "Teacher already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teacher({ name, email, department, password: hashedPassword });

    await newTeacher.save();
    res.status(201).json({ message: "Teacher Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Teacher Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: teacher._id, email: teacher.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, teacher: { name: teacher.name, email: teacher.email, department: teacher.department } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
