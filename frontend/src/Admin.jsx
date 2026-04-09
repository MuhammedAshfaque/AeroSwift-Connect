import { useState, useEffect } from 'react';
import { fetchFlights, createFlight, createDeal, getActiveDeals } from './api';

export default function Admin() {
    const [flights, setFlights] = useState([]);
    
    // Flight Form
    const [src, setSrc] = useState('');
    const [dest, setDest] = useState('');
    const [depTime, setDepTime] = useState('');
    const [arrTime, setArrTime] = useState('');
    const [price, setPrice] = useState('');

    // Deal Form
    const [flightId, setFlightId] = useState('');
    const [discount, setDiscount] = useState('');
    const [duration, setDuration] = useState('1');
    const [activeDeals, setActiveDeals] = useState([]);

    const loadFlights = () => fetchFlights().then(data => {
        setFlights(data);
        if(data.length > 0 && !flightId) setFlightId(data[0].id);
    });

    const loadDeals = () => getActiveDeals().then(data => setActiveDeals(data));

    useEffect(() => {
        loadFlights();
        loadDeals();
        const interval = setInterval(loadDeals, 10000); // refresh deals every 10s
        return () => clearInterval(interval);
    }, []);

    const handleAddFlight = async (e) => {
        e.preventDefault();
        await createFlight({
            source: src,
            destination: dest,
            departureTime: depTime,
            arrivalTime: arrTime,
            price: parseFloat(price)
        });
        alert('Flight Added');
        loadFlights();
    };

    const handleAddDeal = async (e) => {
        e.preventDefault();
        await createDeal({
            flightId: parseInt(flightId),
            discountPercentage: parseFloat(discount),
            durationMinutes: parseInt(duration)
        });
        alert('Flash Deal Sent!');
        loadDeals();
    };

    return (
        <div>
            <div className="glass-panel" style={{ marginBottom: '30px' }}>
                <h2>Admin: Add Flight Data</h2>
                <form onSubmit={handleAddFlight} style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    <input type="text" placeholder="Source" value={src} onChange={e=>setSrc(e.target.value)} required />
                    <input type="text" placeholder="Destination" value={dest} onChange={e=>setDest(e.target.value)} required />
                    <input type="datetime-local" value={depTime} onChange={e=>setDepTime(e.target.value)} required />
                    <input type="datetime-local" value={arrTime} onChange={e=>setArrTime(e.target.value)} required />
                    <input type="number" step="0.01" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required />
                    <button type="submit">Save Flight</button>
                </form>
            </div>

            <div className="glass-panel deal-active">
                <h2>Admin: Flash Deals</h2>
                <p style={{color:'#aaa', marginBottom:'20px'}}>Create a special timed deal. Users searching routes will see discounted prices automatically.</p>
                <form onSubmit={handleAddDeal} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <select value={flightId} onChange={e=>setFlightId(e.target.value)}>
                        {flights.map(f => (
                            <option key={f.id} value={f.id}>{f.source} → {f.destination} (₹{f.price})</option>
                        ))}
                    </select>
                    <input type="number" placeholder="Discount %" value={discount} onChange={e=>setDiscount(e.target.value)} required style={{width:'150px'}} />
                    <select value={duration} onChange={e=>setDuration(e.target.value)} style={{width:'150px'}}>
                        <option value="1">1 Minute</option>
                        <option value="2">2 Minutes</option>
                        <option value="5">5 Minutes</option>
                    </select>
                    <button type="submit">Activate Deal</button>
                </form>

                <h3 style={{marginTop: '30px', marginBottom: '15px'}}>Currently Active Deals ({activeDeals.length})</h3>
                {activeDeals.length > 0 ? (
                    <ul>
                        {activeDeals.map(d => (
                            <li key={d.id} style={{padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                                <strong>Flight ID {d.flight.id}:</strong> {d.flight.source} → {d.flight.destination} 
                                <span className="badge">{d.discountPercentage}% OFF</span> 
                                <span style={{marginLeft:'10px', color:'#aaa', fontSize:'0.8rem'}}>Expires: {new Date(d.endTime).toLocaleTimeString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{color:'#aaa', fontStyle:'italic'}}>No active deals.</p>
                )}
            </div>
        </div>
    );
}
