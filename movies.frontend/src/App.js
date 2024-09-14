import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css'; // Make sure this is your stylesheet

import Customer from './components/Customer';
import Movie from './components/Movie';
import Reservation from './components/Reservation';
import Showtime from './components/Showtime';
import Theater from './components/Theater';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [auth, setAuth] = useState({ isAuthenticated: false, role: null, token: null });

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1 className="company-name">Mayo's Movies</h1>
                    <Routes>
                        <Route path="/" element={
                            !auth.isAuthenticated ? (
                                <div className="home-buttons">
                                    <Link to="/login" className="btn">Login</Link>
                                    <Link to="/register" className="btn">Register</Link>
                                </div>
                            ) : null
                        } />
                        <Route path="/login" element={<Login setAuth={setAuth} />} />
                        <Route path="/register" element={<Register />} />
                        {auth.isAuthenticated ? (
                            auth.role === 'admin' ? (
                                <>
                                    <Route path="/customers" element={<Customer />} />
                                    <Route path="/movies" element={<Movie />} />
                                    <Route path="/reservations" element={<Reservation />} />
                                    <Route path="/showtimes" element={<Showtime />} />
                                    <Route path="/theaters" element={<Theater />} />
                                    <Route path="*" element={<Navigate to="/customers" />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/movies" element={<Movie />} />
                                    <Route path="/reservations" element={<Reservation />} />
                                    <Route path="*" element={<Navigate to="/movies" />} />
                                </>
                            )
                        ) : (
                            <Route path="*" element={<Navigate to="/" />} />
                        )}
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
