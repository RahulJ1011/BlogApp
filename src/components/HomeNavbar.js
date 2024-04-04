import React, { useState } from 'react';
import { Toolbar, Typography, AppBar, Box, Button, Container, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import {FormControl,InputLabel} from '@mui/material'
const HomeNavbar = () => {
  const [profile,setProfile] = useState(' ')
  const user = useSelector((state) => state.user);
  const userName = user ? user.userName : null;
  const handleProfileChange = (e) => {
    setProfile(e.target.value);
    console.log(e.target.value);
  
    if (e.target.value === "logout") {
      localStorage.setItem("token", null);
      window.location.href = '/login'; 
    }
  }
  
  return (
    <AppBar position='static' color='secondary'>
      <Container maxWidth='xl'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: 'flex',
              cursor: 'pointer',
              flexGrow: 1,
              justifyContent: 'space-between',
              letterSpacing: '.5rem',
              color: 'primary',
              textDecoration: 'none',
            }}
          >
            BLOG
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '25px' }}>
            <Button color='inherit' href='/posts'>
              Home
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '25px' }}>
            <Button color='inherit' href='/:id/myposts'>
              Myposts
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '25px' }}>
            <Button color='inherit' href='/add'>
              Post
            </Button>
          </Box>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
       
         
          <Select
              value={profile}
              onChange={handleProfileChange}
              sx={{
                width: "200px",
                height: "60px",
                border: "0.5px solid black",
                marginLeft: "10px",
              }}
             
            >
              <MenuItem value={userName}>
               
                {userName}
              </MenuItem>
              <MenuItem value={"logout"}><Link
              to={'/login'}
              >
              LOGOUT
              </Link></MenuItem>
            </Select>
      </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeNavbar;
