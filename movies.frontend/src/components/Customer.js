import React, { useState, useEffect } from 'react';
import api from '../Api';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [customerId, setCustomerId] = useState('');

    useEffect(() => {
        api.get('/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleCreateCustomer = () => {
        api.post('/customers', { firstName, lastName, email, phone })
            .then(response => {
                setCustomers([...customers, response.data]);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
            })
            .catch(error => console.error('Error creating customer:', error));
    };

    const handleDeleteCustomer = () => {
        api.delete(`/customers/${customerId}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.id !== parseInt(customerId)));
                setCustomerId('');
            })
            .catch(error => console.error('Error deleting customer:', error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Customers</Typography>
            <Box component={Paper} elevation={3} p={3} mb={3}>
                <Typography variant="h6" mb={2}>Add Customer</Typography>
                <Box mb={2}>
                    <TextField
                        label="First Name"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Last Name"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Phone"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleCreateCustomer}>
                    Create Customer
                </Button>
            </Box>
            <Box component={Paper} elevation={3} p={3}>
                <Typography variant="h6" mb={2}>Delete Customer</Typography>
                <Box mb={2}>
                    <TextField
                        label="Customer ID"
                        type="number"
                        fullWidth
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="error" onClick={handleDeleteCustomer}>
                    Delete Customer
                </Button>
            </Box>
        </Container>
    );
};

export default Customer;
