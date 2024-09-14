import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import api from '../Api'; 
import { useNavigate } from 'react-router-dom'; 

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    const handleViewReservations = () => {
        navigate('/user-reservations');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Movies</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {movies.map(movie => (
                    <Card key={movie.id} style={{ width: '300px', cursor: 'pointer' }} onClick={() => handleMovieClick(movie.id)}>
                        <CardMedia
                            component="img"
                            alt={movie.title}
                            height="140"
                            image={movie.imageUrl ? movie.imageUrl : '/test.jpeg'} 
                        />
                        <CardContent>
                            <Typography variant="h6">{movie.title}</Typography>
                            <Typography variant="body2" color="textSecondary">{movie.description}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleViewReservations}>
                    View Reservations
                </Button>
            </div>
        </Container>
    );
};

export default MoviesList;
