import React, { useState, useEffect } from 'react';
import api from '../Api';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [showtimeId, setShowtimeId] = useState('');
    const [seatCount, setSeatCount] = useState('');
    const [reservationId, setReservationId] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        api.get('/reservations')
            .then(response => setReservations(response.data))
            .catch(error => console.error('Error fetching reservations:', error));
    }, []);

    const handleCreateReservation = () => {
        api.post('/reservations', { customerId, showtimeId, seatCount })
            .then(response => {
                setReservations([...reservations, response.data]);
                setCustomerId('');
                setShowtimeId('');
                setSeatCount('');
                setSnackbar({ open: true, message: 'Reservation created successfully!', severity: 'success' });
            })
            .catch(error => console.error('Error creating reservation:', error));
            setSnackbar({ open: true, message: 'Error creating reservation.', severity: 'error' });
    };

    const handleDeleteReservation = () => {
        api.delete(`/reservations/${reservationId}`)
            .then(() => {
                setReservations(reservations.filter(reservation => reservation.id !== parseInt(reservationId)));
                setReservationId('');
                setSnackbar({ open: true, message: 'Reservation deleted successfully!', severity: 'success' });
            })
            .catch(error => console.error('Error deleting reservation:', error));
            setSnackbar({ open: true, message: 'Error deleting reservation.', severity: 'error' });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Reservations</Typography>
            <Box component={Paper} elevation={3} p={3} mb={3}>
                <Typography variant="h6" mb={2}>Create Reservation</Typography>
                <Box mb={2}>
                    <TextField
                        label="Customer ID"
                        type="number"
                        fullWidth
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Showtime ID"
                        type="number"
                        fullWidth
                        value={showtimeId}
                        onChange={(e) => setShowtimeId(e.target.value)}
                    />
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
                <Button variant="contained" color="primary" onClick={handleCreateReservation}>
                    Create Reservation
                </Button>
            </Box>
            <Box component={Paper} elevation={3} p={3}>
                <Typography variant="h6" mb={2}>Delete Reservation</Typography>
                <Box mb={2}>
                    <TextField
                        label="Reservation ID"
                        type="number"
                        fullWidth
                        value={reservationId}
                        onChange={(e) => setReservationId(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="error" onClick={handleDeleteReservation}>
                    Delete Reservation
                </Button>
            </Box>
        </Container>
    );
};

export default Reservation;

