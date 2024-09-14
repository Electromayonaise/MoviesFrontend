import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../Api';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import qs from 'qs';

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = () => {
        api.post('/login', qs.stringify({ email: username, password }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => {
            const { role, userId } = response.data;
            setAuth({ isAuthenticated: true, role, token: '', userId }); // Include userId in auth state
            setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
            localStorage.setItem('userId', userId); 
            localStorage.setItem('role', role);
            console.log('Logged in as:', role);
            if (role === 'ADMIN') {
                navigate('/admin'); 
            } else {
                navigate('/movies'); 
            }
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
                label="Email"
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
