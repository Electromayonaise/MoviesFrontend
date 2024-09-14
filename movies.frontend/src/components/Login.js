import React, { useState } from 'react';
import api from '../Api';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleLogin = () => {
        api.post('/login', { username, password })
            .then(response => {
                // Assuming response contains user role and token
                const { role, token } = response.data;
                setAuth({ isAuthenticated: true, role, token });
                setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
            })
            .catch(error => {
                console.error('Error logging in:', error);
                setSnackbar({ open: true, message: 'Login failed.', severity: 'error' });
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Login</Typography>
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
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
