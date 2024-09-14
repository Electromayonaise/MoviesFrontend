import React, { useState, useEffect } from 'react';
import api from '../Api';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';

const Showtime = () => {
    const [showtimes, setShowtimes] = useState([]);
    const [movieId, setMovieId] = useState('');
    const [theaterId, setTheaterId] = useState('');
    const [showDate, setShowDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [showtimeId, setShowtimeId] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        api.get('/showtimes')
            .then(response => setShowtimes(response.data))
            .catch(error => console.error('Error fetching showtimes:', error));
    }, []);

    const handleCreateShowtime = () => {
        // Send the data in the format expected by the ShowtimeDto
        const showtimeData = {
            movieId: movieId, // Directly use movieId
            theaterId: theaterId, // Directly use theaterId
            showDate: showDate,
            startTime: startTime
        };
    
        console.log(showtimeData);
        api.post('/showtimes', showtimeData)
            .then(response => {
                setShowtimes([...showtimes, response.data]);
                setMovieId(''); // Clear form fields
                setTheaterId('');
                setShowDate('');
                setStartTime('');
                setSnackbar({ open: true, message: 'Showtime created successfully!', severity: 'success' });
            })
            .catch(error => {
                console.error('Error creating showtime:', error);
                setSnackbar({ open: true, message: 'Error creating showtime.', severity: 'error' });
            });
    };
    

    const handleDeleteShowtime = () => {
        api.delete(`/showtimes/${showtimeId}`)
            .then(() => {
                setShowtimes(showtimes.filter(showtime => showtime.id !== parseInt(showtimeId)));
                setShowtimeId('');
                setSnackbar({ open: true, message: 'Showtime deleted successfully!', severity: 'success' });
            })
            .catch(error => console.error('Error deleting showtime:', error));
            setSnackbar({ open: true, message: 'Error deleting showtime.', severity: 'error' });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Showtimes</Typography>
            <Box component={Paper} elevation={3} p={3} mb={3}>
                <Typography variant="h6" mb={2}>Add Showtime</Typography>
                <Box mb={2}>
                    <TextField
                        label="Movie ID"
                        type="number"
                        fullWidth
                        value={movieId}
                        onChange={(e) => setMovieId(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Theater ID"
                        type="number"
                        fullWidth
                        value={theaterId}
                        onChange={(e) => setTheaterId(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Show Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={showDate}
                        onChange={(e) => setShowDate(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Start Time"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleCreateShowtime}>
                    Create Showtime
                </Button>
            </Box>
            <Box component={Paper} elevation={3} p={3}>
                <Typography variant="h6" mb={2}>Delete Showtime</Typography>
                <Box mb={2}>
                    <TextField
                        label="Showtime ID"
                        type="number"
                        fullWidth
                        value={showtimeId}
                        onChange={(e) => setShowtimeId(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="error" onClick={handleDeleteShowtime}>
                    Delete Showtime
                </Button>
            </Box>
        </Container>
    );
};

export default Showtime;
