import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // ✅ Show loading

        try {
            const response = await fetch("http://localhost:5000/api/students/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Backend Response:", data); // ✅ Debugging

            if (response.ok) {
                // ✅ Store token & student info
                localStorage.setItem("studentToken", data.token);
                localStorage.setItem("studentData", JSON.stringify(data.student));
                navigate("/student/dashboard");
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (error) {
            setError("Server error. Please try again later.");
            console.error("Login Error:", error);
        } finally {
            setLoading(false); // ✅ Hide loading
        }
    };

    return (
        <div style={styles.container}>
            <h2>Student Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>
                If you don’t have an account, <a href="/student/register">register here</a>
            </p>
        </div>
    );
};

// ✅ Added basic inline styles
const styles = {
    container: { textAlign: "center", padding: "20px" },
    form: { display: "flex", flexDirection: "column", alignItems: "center" },
    input: {
        width: "300px",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        width: "320px",
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    error: { color: "red", fontWeight: "bold" },
};

export default StudentLogin;
