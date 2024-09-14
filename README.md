# Frontend - Movies Reservation System

## Overview

This is the frontend application for a movies reservation system, built using React. It provides a user interface for managing reservations, viewing movies, showtimes, theaters, and user authentication.

## Features

- **User Authentication**: Log in and register users.
- **Reservation Management**: Create and cancel reservations.
- **Movie Listings**: View available movies and their details.
- **Showtimes and Theaters**: View and select showtimes and theaters.

## Technologies

- **React**: JavaScript library for building the user interface.
- **MUI (Material-UI)**: UI components library.
- **Axios**: HTTP client for making API requests.
- **React Router**: Routing library for navigating between pages.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed.

### Configuration

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Electromayonaise/MoviesFrontend.git
   cd MoviesFrontend
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```
3. **Run the backend part of this project**

  You can find it on https://github.com/Electromayonaise/MoviesBackend with its own set of instructions. 

5. **Run the Application**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

4. **Access the Application**

   The frontend application will be running on `http://localhost:3000`.


## Components

- **Login**: Component for user authentication.
- **Register**: Component for user registration.
- **MoviesList**: Displays a list of movies.
- **MovieDetails**: Shows details of a selected movie.
- **UserReservation**: Allows users to view and manage their reservations.
- **AdminPanel**: Admin interface for managing reservations, movies, theaters, and showtimes.

## Routes

- **/login** - Login page.
- **/register** - Registration page.
- **/movies** - List of movies.
- **/movies/:id** - Movie details and showtimes.
- **/reservations** - User reservation management.
- **/admin** - Admin panel for managing entities.

**Note that the views you get will depend on the role of the user you log in with, by default all users are normal users, if you want to create an admin you can do so using postman**
```json
{
    "firstName": "TEST",
    "lastName": "test",
    "email": "test",
    "phone": "123-456-7890",
    "password": "password",
    "role": "ADMIN" 
}
```

