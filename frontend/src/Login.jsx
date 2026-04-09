import { useState } from 'react';
import { login } from './api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setUser }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(credentials);
            if (data.email) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} required />
                </div>
                <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Sign In</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--secondary)' }}>Register here</Link>
            </p>
        </div>
    );
}
