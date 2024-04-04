import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Mypost = () => {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);

  const mypost = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/posts/${_id}/myposts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        
      });
      console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    mypost();
  }, []);

  return (
    <Container
      sx={{
        marginLeft: '100px',
        padding: '30px',
        display: 'flex',
        justifyContent: 'space-around',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {data?.length > 0 ? (
        data.map((post) => (
          <div key={post._id} style={{ marginBottom: '20px' }}>
            <Typography variant="h5" sx={{ padding: '20px' }}>
              {post.userName}
            </Typography>
            <img src={`http://localhost:4000/${post.picture}`} alt={post.userName} height={300} width={300} />
            <Typography sx={{ padding: '20px', marginLeft: 0 }}>{post.description}</Typography>
          </div>
        ))
      ) : (
        <Container  
         sx={{
          display:"flex",
          flexDirection:"column"
         }}
        >
          <Typography variant="h2" sx={{
          textAlign:"center"
        }}>No posts to display.. </Typography>
        <Typography  
        sx={{
          textAlign:"center",
          textDecoration:"none",
          marginTop:"30px",
          fontSize:"25px"
        }}
        >  <Link
         
        to={'/add'}>
        Post here
        </Link></Typography>
        </Container>
       
      )}
    </Container>
  );
};

export default Mypost;
