const API_URL = 'http://localhost:8080/api';

export const login = async (credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
};

export const register = async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!res.ok) throw new Error('Registration failed. Email might already exist.');
    return res.json();
};

export const fetchFlights = async () => {
    const res = await fetch(`${API_URL}/flights`);
    return res.json();
};

export const searchRoutes = async (source, destination) => {
    const res = await fetch(`${API_URL}/flights/search?source=${source}&destination=${destination}`);
    return res.json();
};

export const createFlight = async (flight) => {
    const res = await fetch(`${API_URL}/flights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flight)
    });
    return res.json();
};

export const createDeal = async (deal) => {
    const res = await fetch(`${API_URL}/deals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deal)
    });
    return res.json();
};

export const getActiveDeals = async () => {
    const res = await fetch(`${API_URL}/deals/active`);
    return res.json();
};

export const createBooking = async (booking) => {
    const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    return res.json();
};

export const getBookingHistory = async (email) => {
    const res = await fetch(`${API_URL}/bookings/${email}`);
    return res.json();
};
