import React, { useState } from 'react';
import { Container, Button, Link, CssBaseline, Box, Typography, Avatar, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setLogin} from '../State'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:4000/api/auth/login',{
      email,
      password
    },
    {
    headers:{
      "Content-type":"application/json"
    }
  })
  const {token} = response.data
  localStorage.setItem('token', token);
  console.log(response)
  if(response)
  {
    dispatch(
      setLogin({
        user:response.data.user,
        token:response.data.token
        
      })
    )
    localStorage.setItem('token', token);
    console.log(setLogin)
    navigate('/posts')
  }   
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "white",
          height: "40vh",
          marginTop: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow:
            '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)',
        }}
      >
        <Typography variant="h5">
          LOGIN
        </Typography>

        <Avatar>
          <LoginIcon />
        </Avatar>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              marginTop: "20px",
              marginBottom: "15px",
              width: "250px",
              height: "45px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          />

          <TextField
            label="Enter password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            sx={{
              marginTop: "20px",
              marginBottom: "15px",
              width: "250px",
              height: "45px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          />

          <Button
            type="submit"
            background-color="secondary" // Change to backgroundColor
            variant='contained'
            sx={{ marginTop: "10px", width: "130px" }}
          >
            LOGIN
          </Button>

          <Typography sx={{ marginTop: "10px" }}>
            Don't have an account
            <Link href="/register" sx={{ paddingLeft: "7px" }}>
              Register
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
