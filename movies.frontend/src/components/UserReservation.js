// UserReservation.js

import React, { useState, useEffect } from 'react';
import api from '../Api';
import { Button, TextField, Container, Typography, Box, Paper, Snackbar, Alert } from '@mui/material';

const UserReservation = () => {
    const [showtimes, setShowtimes] = useState([]);
    const [selectedShowtimeId, setSelectedShowtimeId] = useState('');
    const [seatCount, setSeatCount] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        api.get('/showtimes')  // Assuming this endpoint returns all showtimes
            .then(response => setShowtimes(response.data))
            .catch(error => console.error('Error fetching showtimes:', error));
    }, []);

    const getUserId = () => {
        return localStorage.getItem('userId');
    };

    const handleCreateUserReservation = () => {
        const userId = getUserId();
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        api.post('/reservations/user', { showtimeId: selectedShowtimeId, seatCount }, {
            headers: { 'customerId': userId }  // Send user ID in headers
        })
            .then(response => {
                setSnackbar({ open: true, message: 'Reservation created successfully!', severity: 'success' });
            })
            .catch(error => {
                console.error('Error creating reservation:', error);
                setSnackbar({ open: true, message: 'Error creating reservation.', severity: 'error' });
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Make a Reservation</Typography>
            <Box component={Paper} elevation={3} p={3}>
                <Typography variant="h6" mb={2}>Select Showtime and Seats</Typography>
                <Box mb={2}>
                    <TextField
                        select
                        label="Showtime"
                        fullWidth
                        value={selectedShowtimeId}
                        onChange={(e) => setSelectedShowtimeId(e.target.value)}
                        SelectProps={{ native: true }}
                    >
                        <option value="" disabled>Select Showtime</option>
                        {showtimes.map(showtime => (
                            <option key={showtime.id} value={showtime.id}>
                                {showtime.time} - {showtime.movie.title}
                            </option>
                        ))}
                    </TextField>
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Seat Count"
                        type="number"
                        fullWidth
                        value={seatCount}
                        onChange={(e) => setSeatCount(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleCreateUserReservation}>
                    Reserve Seats
                </Button>
            </Box>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UserReservation;
