import React, { useState } from "react";
import {
  Avatar,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import axios from "axios";
import { storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  const [imageUpload, setImageUpload] = useState();
  const [data, setData] = useState({
    userId: _id,
    userName: "",
    title: "",
    description: "",
    picture: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((preValues) => {
      return {
        ...preValues,
        [name]: value,
      };
    });
  }
  const uploadImage = (event) => {
    event.preventDefault();
    const imageRef = ref(storage, `post/${data.userName}`);
    const imageListRef = ref(storage, `post/`);

    if (imageUpload == null) {
      return;
    }
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Uploaded");
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (item.name === data.userName) {
              setData({
                ...data,
                picture: url,
              });
            }
          });
        });
      });
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/posts/myposts",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      navigate("/posts");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginBottom: "15px",
            }}
          >
            POST
          </Typography>
          <TextField
            type="text"
            label="UserName"
            placeholder="Enter the Username"
            name="userName"
            required
            value={data.userName}
            onChange={handleChange}
            sx={{
              marginBottom: "20px",
            }}
          />
          <TextField
            type="text"
            label="title"
            placeholder="Enter the title"
            required
            value={data.title}
            name="title"
            onChange={handleChange}
            sx={{
              marginBottom: "20px",
            }}
          />
          <TextField
            type="text"
            label="description"
            placeholder="description"
            name="description"
            required
            value={data.description}
            onChange={handleChange}
            sx={{
              marginBottom: "20px",
            }}
          />
        </Box>
        <div
          className="blog-image"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <label>Post </label>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            placeholder
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          ></input>
          <Button
            type="submit"
            onClick={uploadImage}
            style={{
              width: "150px",
              backgroundColor: "red",
              color: "yellow",
            }}
          >
            Upload Post
          </Button>{" "}
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "20px",
          }}
        >
          POST
        </Button>
      </Container>
    </form>
  );
};

export default Upload;
