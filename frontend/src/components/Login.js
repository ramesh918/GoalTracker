import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Container,
} from '@mui/material';
import styles from './Login.module.css';
import axios from 'axios'; // Import Axios for HTTP requests
import { useDispatch } from 'react-redux';
import { setUserToken } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      // Make an HTTP POST request to your authentication endpoint
    //   const response = await axios.post('http://localhost:3000/user/login', {
    //     email,
    //     password,
    //   });

      // Assuming the server sends back a token upon successful login
      const  token  = "response.data";
      // Set the token in the Redux store
      dispatch(setUserToken( token));
      navigate('/dailyGoals');
      // Redirect the user to the dashboard or another page
      // You can use the useHistory hook or <Redirect> from react-router-dom
    } catch (err) {
      // Handle login error
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container className={styles.centerContainer}>
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h5" align="center" gutterBottom>
          Login Page
        </Typography>
        <form className={styles.form}>
          <TextField
            type="text"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className={styles.error}>{error}</div>}
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;