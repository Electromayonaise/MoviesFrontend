import React, { useState } from 'react';
import api from '../Api';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleRegister = () => {
        api.post('/register', { username, password })
            .then(response => {
                setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
            })
            .catch(error => {
                console.error('Error registering:', error);
                setSnackbar({ open: true, message: 'Registration failed.', severity: 'error' });
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Register</Typography>
            <TextField
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleRegister}>
                Register
            </Button>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Register;
