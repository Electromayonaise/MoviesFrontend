import React, { useState, useEffect } from 'react';
import api from '../Api';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';

const API_URL = '/theaters';

const Theater = () => {
    const [theaters, setTheaters] = useState([]);
    const [theaterNumber, setTheaterNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const [theaterId, setTheaterId] = useState('');

    useEffect(() => {
        api.get(API_URL)
            .then(response => setTheaters(response.data))
            .catch(error => console.error('Error fetching theaters:', error));
    }, []);

    const handleCreateTheater = () => {
        api.post(API_URL, { theaterNumber, capacity })
            .then(response => {
                setTheaters([...theaters, response.data]);
                setTheaterNumber('');
                setCapacity('');
            })
            .catch(error => console.error('Error creating theater:', error));
    };

    const handleDeleteTheater = () => {
        api.delete(`${API_URL}/${theaterId}`)
            .then(() => {
                setTheaters(theaters.filter(theater => theater.id !== parseInt(theaterId)));
                setTheaterId('');
            })
            .catch(error => console.error('Error deleting theater:', error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Theaters</Typography>
            <Box component={Paper} elevation={3} p={3} mb={3}>
                <Typography variant="h6" mb={2}>Add Theater</Typography>
                <Box mb={2}>
                    <TextField
                        label="Theater Number"
                        type="number"
                        fullWidth
                        value={theaterNumber}
                        onChange={(e) => setTheaterNumber(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Capacity"
                        type="number"
                        fullWidth
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleCreateTheater}>
                    Create Theater
                </Button>
            </Box>
            <Box component={Paper} elevation={3} p={3}>
                <Typography variant="h6" mb={2}>Delete Theater</Typography>
                <Box mb={2}>
                    <TextField
                        label="Theater ID"
                        type="number"
                        fullWidth
                        value={theaterId}
                        onChange={(e) => setTheaterId(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="error" onClick={handleDeleteTheater}>
                    Delete Theater
                </Button>
            </Box>
        </Container>
    );
};

export default Theater;
