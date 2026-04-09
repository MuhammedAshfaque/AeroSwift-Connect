import { useState, useEffect } from 'react';
import { getBookingHistory } from './api';

export default function BookingHistory({ userEmail }) {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if(userEmail) {
            getBookingHistory(userEmail).then(setBookings).catch(console.error);
        }
    }, [userEmail]);

    return (
        <div className="glass-panel">
            <h2>Your Bookings</h2>
            {bookings.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Flights</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{new Date(b.bookingDate).toLocaleString()}</td>
                                <td>₹{b.totalPrice.toFixed(2)}</td>
                                <td>{b.flights.map(f => `${f.source}→${f.destination}`).join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ marginTop: '20px', color: '#aaa' }}>No booking history found.</p>
            )}
        </div>
    );
}
