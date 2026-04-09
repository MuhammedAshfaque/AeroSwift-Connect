import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import BookingHistory from './BookingHistory';
import Login from './Login';
import Register from './Register';
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <header>
        <h1>BookMyFlight</h1>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <nav>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            {user && <Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>My Bookings</Link>}
            {user?.role === 'ADMIN' && <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin Panel</Link>}
            
            {user ? (
              <span style={{ marginLeft: '20px' }}>
                <span style={{ marginRight: '15px', color: '#aaa' }}>Hi, {user.name}</span>
                <button onClick={handleLogout} style={{ padding: '8px 15px', fontSize: '0.8rem' }}>Logout</button>
              </span>
            ) : (
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''} style={{ marginLeft: '20px' }}>Login</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/admin" element={user?.role === 'ADMIN' ? <Admin /> : <Navigate to="/" />} />
          <Route path="/history" element={user ? <BookingHistory userEmail={user.email} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
