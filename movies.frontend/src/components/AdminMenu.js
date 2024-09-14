import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const AdminMenu = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin Menu</Typography>
            <div>
                <Button
                    component={Link}
                    to="/customers"
                    variant="contained"
                    style={{ margin: '8px' }}
                >
                    Manage Customers
                </Button>
                <Button
                    component={Link}
                    to="/movies"
                    variant="contained"
                    style={{ margin: '8px' }}
                >
                    Manage Movies
                </Button>
                <Button
                    component={Link}
                    to="/reservations"
                    variant="contained"
                    style={{ margin: '8px' }}
                >
                    Manage Reservations
                </Button>
                <Button
                    component={Link}
                    to="/showtimes"
                    variant="contained"
                    style={{ margin: '8px' }}
                >
                    Manage Showtimes
                </Button>
                <Button
                    component={Link}
                    to="/theaters"
                    variant="contained"
                    style={{ margin: '8px' }}
                >
                    Manage Theaters
                </Button>
            </div>
        </Container>
    );
};

export default AdminMenu;
