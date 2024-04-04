import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Typography, Box } from "@mui/material";

const Main = () => {
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/posts/displayPosts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container
      sx={{
        marginLeft: "100px",
        marginRight: "0px",
        padding: "30px",
        display: "flex",
        justifyContent: "space-around",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      {data.map((post) => (
        <div key={post._id} style={{ marginBottom: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                padding: "20px",
                
              }}
            >
              {post.userName}
            </Typography>
            <img src={`${post.profile}`} height={50} width={50} />
          </Box>
          <img src={`${post.picture}`} height={500} width={500} />
          <Typography
            sx={{
              padding: "20px",
              marginLeft: 0,
            }}
          >
            {post.description}
          </Typography>
        </div>
      ))}
    </Container>
  );
};

export default Main;
