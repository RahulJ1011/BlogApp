import React from 'react'
import {AppBar, Box, Button, Container, MenuItem, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
   <AppBar position='static'
            color='secondary'
   >
    <Container maxWidth='xl'>
      <Toolbar>
    
         <Typography
          variant='h6'
          noWrap
         
          sx={{
            mr:2,
            display:'flex',
            cursor:'pointer',
            flexGrow:1,
            justifyContent:"space-between",
            letterSpacing:'.5rem',
            color:"primary",
            textDecoration:"none"
          }}
        >
          BLOG
        </Typography>
    
       
      <Box sx={{display:{xs:'none',sm:'block'},
    fontSize:"25px"}}>
        <Button color='inherit'
          href='/home'
        >
            HOME
        </Button>
        
      </Box>
      <Box sx={{display:{xs:'none',sm:'block'},
    fontSize:"25px"}}>
        <Button color='inherit'
        href='/register'
        >
            SIGNUP
        </Button>
        
      </Box>
      <Box sx={{display:{xs:'none',sm:'block'},
    fontSize:"25px"}}>
        <Button color='inherit'
          href='/login'
        >
            SIGNIN
        </Button>
        
      </Box>
      <Box sx={{display:{xs:'none',sm:'block'}, fontSize:"25px"}}>
        <Button color='inherit'
          href='/home'
        >
            ABOUT
        </Button>
        
      </Box>
      </Toolbar>
    </Container>
   </AppBar>
  )
}

export default Navbar
