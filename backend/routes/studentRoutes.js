const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Student = require("../models/Student");

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const SECRET_KEY = process.env.SECRET_KEY || "1111"; // Must be set in .env

// ✅ Student Registration Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, rollNumber, department, year, section, secretKey } = req.body;

    // ❌ Check if secret key is invalid
    if (secretKey !== SECRET_KEY) {
      return res.status(403).json({ success: false, message: "Invalid Secret Key" });
    }

    // ❌ Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // 🔒 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ name, email, password: hashedPassword, rollNumber, department, year, section });

    await newStudent.save();
    res.status(201).json({ success: true, message: "Student Registered Successfully" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ✅ Student Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 🔑 Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: student._id, role: "student" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
        year: student.year,
        section: student.section
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
