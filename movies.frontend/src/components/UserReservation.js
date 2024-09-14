import React, { useState, useEffect } from 'react';
import api from '../Api';
import { Button, Typography, Container, Box, Paper, Snackbar, Alert, List, ListItem, ListItemText } from '@mui/material';

const UserReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchReservations = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await api.get('/reservations/user', {
                        headers: { 'customerId': userId }
                    });
                    setReservations(response.data);
                } catch (error) {
                    console.error('Error fetching reservations:', error);
                }
            }
        };
        fetchReservations();
    }, []);

    const handleCancelReservation = async (reservationId) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                await api.delete(`/reservations/user/${reservationId}`, {
                    headers: { 'customerId': userId }
                });
                setReservations(reservations.filter(reservation => reservation.id !== reservationId));
                setSnackbar({ open: true, message: 'Reservation canceled successfully!', severity: 'success' });
            } catch (error) {
                console.error('Error canceling reservation:', error);
                setSnackbar({ open: true, message: 'Error canceling reservation.', severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>My Reservations</Typography>
            <Box component={Paper} elevation={3} p={3}>
                <Typography variant="h6" mb={2}>Your Reservations</Typography>
                <List>
                    {reservations.length > 0 ? reservations.map(reservation => (
                        <ListItem key={reservation.id} secondaryAction={
                            <Button variant="outlined" color="secondary" onClick={() => handleCancelReservation(reservation.id)}>
                                Cancel
                            </Button>
                        }>
                            <ListItemText
                                primary={`Reservation ID: ${reservation.id}`}
                                secondary={`Movie: ${reservation.showtime.movie.title}, Seats: ${reservation.seatCount}`}
                            />
                        </ListItem>
                    )) : (
                        <ListItem>
                            <ListItemText primary="No reservations found" />
                        </ListItem>
                    )}
                </List>
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
