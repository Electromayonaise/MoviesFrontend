import React, { useState, useEffect } from 'react';
import api from '../Api';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [duration, setDuration] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [movieId, setMovieId] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        api.get('/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const handleCreateMovie = () => {
        api.post('/movies', { title, director, duration, releaseDate })
            .then(response => {
                setMovies([...movies, response.data]);
                setTitle('');
                setDirector('');
                setDuration('');
                setReleaseDate('');
                setSnackbar({ open: true, message: 'Movie created successfully!', severity: 'success' });
            })
            .catch(error => console.error('Error creating movie:', error));
            setSnackbar({ open: true, message: 'Error creating movie.', severity: 'error' });

    };

    const handleDeleteMovie = () => {
        api.delete(`/movies/${movieId}`)
            .then(() => {
                setMovies(movies.filter(movie => movie.id !== parseInt(movieId)));
                setMovieId('');
                setSnackbar({ open: true, message: 'Movie deleated successfully!', severity: 'success' });
            })
            .catch(error => console.error('Error deleting movie:', error));
            setSnackbar({ open: true, message: 'Error deleting movie.', severity: 'error' });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Movies</Typography>
            <Box component={Paper} elevation={3} p={3} mb={3}>
                <Typography variant="h6" mb={2}>Add Movie</Typography>
                <Box mb={2}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Director"
                        fullWidth
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Release Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleCreateMovie}>
                    Create Movie
                </Button>
            </Box>
            <Box component={Paper} elevation={3} p={3}>
                <Typography variant="h6" mb={2}>Delete Movie</Typography>
                <Box mb={2}>
                    <TextField
                        label="Movie ID"
                        type="number"
                        fullWidth
                        value={movieId}
                        onChange={(e) => setMovieId(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="error" onClick={handleDeleteMovie}>
                    Delete Movie
                </Button>
            </Box>
        </Container>
    );
};

export default Movie;
