import { useState } from 'react';
import { register } from './api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register({ setUser }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await register(formData);
            if (data.email) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                </div>
                <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Create Account</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--secondary)' }}>Login here</Link>
            </p>
        </div>
    );
}
