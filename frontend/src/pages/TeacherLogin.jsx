import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/teacher/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/teachers/dashboard'); // Redirect on successful login
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Teacher Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            <p>If you don’t have an account, <a href="/teachers/register">register here</a></p>
        </div>
    );
};

export default TeacherLogin;