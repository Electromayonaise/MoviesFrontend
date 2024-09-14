import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';

import Customer from './components/Customer';
import Movie from './components/Movie';
import Reservation from './components/Reservation';
import Showtime from './components/Showtime';
import Theater from './components/Theater';
import Login from './components/Login';
import Register from './components/Register';
import AdminMenu from './components/AdminMenu';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import UserReservation from './components/UserReservation';

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

                        {/* Admin routes */}
                        {auth.isAuthenticated && auth.role === 'ADMIN' && (
                            <>
                                <Route path="/admin" element={<AdminMenu />} />
                                <Route path="/customers" element={<Customer token={auth.token} />} />
                                <Route path="/movies" element={<Movie token={auth.token} />} />
                                <Route path="/reservations" element={<Reservation token={auth.token} />} />
                                <Route path="/showtimes" element={<Showtime token={auth.token} />} />
                                <Route path="/theaters" element={<Theater token={auth.token} />} />
                                <Route path="*" element={<Navigate to="/admin" />} />
                            </>
                        )}

                        {/* User routes */}
                        {auth.isAuthenticated && auth.role !== 'ADMIN' && (
                            <>
                                <Route path="/movies" element={<MoviesList />} />
                                <Route path="/movies/:id" element={<MovieDetails />} />
                                <Route path="/reservations" element={<UserReservation />} />
                                <Route path="*" element={<Navigate to="/movies" />} />
                            </>
                        )}

                        {/* Redirect unauthenticated users */}
                        {!auth.isAuthenticated && (
                            <Route path="*" element={<Navigate to="/" />} />
                        )}
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
