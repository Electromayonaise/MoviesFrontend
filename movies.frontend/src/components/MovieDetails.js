import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardContent, CardMedia, List, ListItem, ListItemText, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../Api';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [seatCount, setSeatCount] = useState(1);
    const [seatDialogOpen, setSeatDialogOpen] = useState(false);

    useEffect(() => {
        // Fetch movie details
        api.get(`/movies/${id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error('Error fetching movie details:', error));

        // Fetch all showtimes
        api.get('/showtimes')
            .then(response => {
                // Filter showtimes by movie ID
                const filteredShowtimes = response.data.filter(showtime => showtime.movie.id === parseInt(id));
                setShowtimes(filteredShowtimes);
            })
            .catch(error => console.error('Error fetching showtimes:', error));
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    const handleSelectShowtime = (showtimeId) => {
        setSelectedShowtime(showtimeId);
    };

    const handleOpenSeatDialog = () => {
        setSeatDialogOpen(true);
    };

    const handleCloseSeatDialog = () => {
        setSeatDialogOpen(false);
    };

    const handleReserve = () => {
        const customerId = localStorage.getItem('userId'); // Get user ID from local storage
        if (!customerId) {
            alert('User not authenticated.');
            return;
        }

        if (selectedShowtime) {
            api.post('/reservations/user', null, {
                params: {
                    showtimeId: selectedShowtime,
                    seatCount: seatCount
                },
                headers: {
                    'Customer-Id': customerId
                }
            })
            .then(response => {
                console.log('Reservation successful:', response.data);
                // Handle success, e.g., navigate to a confirmation page
                handleCloseSeatDialog();
            })
            .catch(error => {
                console.error('Error making reservation:', error);
                // Handle error, e.g., show an error message
            });
        } else {
            alert('Please select a showtime.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{movie.title}</Typography>
            <Card>
                <CardMedia
                    component="img"
                    alt={movie.title}
                    height="140"
                    image={movie.imageUrl} // Adjust as needed
                />
                <CardContent>
                    <Typography variant="h6">{movie.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{movie.description}</Typography>
                    <Typography variant="body1">Director: {movie.director}</Typography>
                    <Typography variant="body1">Duration: {movie.duration} minutes</Typography>
                    <Typography variant="body1">Release Date: {movie.releaseDate}</Typography>
                </CardContent>
            </Card>
            <Typography variant="h5" gutterBottom mt={2}>Available Showtimes</Typography>
            <List>
                {showtimes.map(showtime => (
                    <ListItem
                        button
                        key={showtime.id}
                        selected={selectedShowtime === showtime.id}
                        onClick={() => handleSelectShowtime(showtime.id)}
                    >
                        <ListItemText
                            primary={`Date: ${showtime.showDate}, Time: ${showtime.startTime}`}
                            secondary={`Theater: ${showtime.theater.id}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenSeatDialog}
                disabled={!selectedShowtime}
            >
                Reserve
            </Button>

            {/* Seat Selection Dialog */}
            <Dialog open={seatDialogOpen} onClose={handleCloseSeatDialog}>
                <DialogTitle>Select Number of Seats</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Number of Seats"
                        type="number"
                        fullWidth
                        value={seatCount}
                        onChange={(e) => setSeatCount(parseInt(e.target.value) || 1)}
                        InputProps={{ inputProps: { min: 1 } }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSeatDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleReserve} color="primary">
                        Reserve
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MovieDetails;
