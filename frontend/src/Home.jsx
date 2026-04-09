import { useState } from 'react';
import { searchRoutes, createBooking } from './api';
import { useNavigate } from 'react-router-dom';

export default function Home({ user }) {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!source || !destination) return;
        setLoading(true);
        setSearched(true);
        try {
            const data = await searchRoutes(source, destination);
            setRoutes(data);
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBook = async (route) => {
        if(!user) {
            alert('Please login to book a flight.');
            navigate('/login');
            return;
        }
        try {
            const flightIds = route.flights.map(f => f.id);
            await createBooking({ userEmail: user.email, flightIds, totalCost: route.totalCost });
            alert('Booking successful!');
            navigate('/history');
        } catch(err) {
            console.error(err);
            alert('Failed to book.');
        }
    };

    return (
        <div className="glass-panel">
            <h2>Find Your Perfect Flight</h2>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label>From</label>
                    <input value={source} onChange={e => setSource(e.target.value)} placeholder="e.g. Kolkata" required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label>To</label>
                    <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Mumbai" required />
                </div>
                <button type="submit" style={{ marginTop: '25px', height: '46px' }} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div style={{ marginTop: '30px' }}>
                {routes.length > 0 ? (
                    routes.map((route, idx) => {
                        const baseTotal = route.flights.reduce((sum, f) => sum + f.price, 0);
                        const discountPercentage = baseTotal > route.totalCost ? Math.round(((baseTotal - route.totalCost) / baseTotal) * 100) : 0;
                        
                        return (
                        <div key={idx} className="route-card" style={{ position: 'relative', overflow: 'hidden' }}>
                            {discountPercentage > 0 && (
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0,
                                    background: 'linear-gradient(90deg, #ff007f 0%, #8a2be2 100%)',
                                    color: 'white', textAlign: 'center', padding: '5px',
                                    fontSize: '0.85rem', fontWeight: 'bold'
                                }}>
                                    🔥 {discountPercentage}% OFF - Flash Deal Applied!
                                </div>
                            )}
                            <div className="route-details" style={{ marginTop: discountPercentage > 0 ? '25px' : '0' }}>
                                <h3>
                                    {route.flights.map(f => f.source).join(' → ')} → {route.flights[route.flights.length - 1].destination}
                                    {route.stops > 0 && <span className="badge" style={{background:'#f39c12'}}>{route.stops} Stop(s)</span>}
                                </h3>
                                <div>
                                    {route.flights.map((f, i) => (
                                        <p key={i}>Flight {f.id}: {f.source} to {f.destination} at {new Date(f.departureTime).toLocaleString()} | Base Cost: ₹{f.price}</p>
                                    ))}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                {discountPercentage > 0 && (
                                    <div style={{ textDecoration: 'line-through', color: '#aaa', fontSize: '0.9rem', marginBottom: '2px' }}>
                                        ₹{baseTotal.toFixed(2)}
                                    </div>
                                )}
                                <div className="price">₹{route.totalCost.toFixed(2)}</div>
                                <button onClick={() => handleBook(route)} style={{ marginTop: '10px' }}>Book Now</button>
                            </div>
                        </div>
                    )})
                ) : (
                    searched && !loading && <p style={{ color: '#aaa', textAlign: 'center' }}>No route found.</p>
                )}
            </div>
        </div>
    );
}
