import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { HowToReg } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { storage } from "../firebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
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

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:4000/api/auth/register", data).then(() => {
      console.log(data, "uploaded");
      navigate("/login");
    });
  }

  const [imageUpload, setImageUpload] = useState();

  const uploadImage = (event) => {
    event.preventDefault();
    const imageRef = ref(storage, `images/${data.userName}`);
    const imageListRef = ref(storage, `images/`);

    if (imageUpload == null) {
      return;
    }
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Uploaded");
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (item.name === data.userName) {
              setData({ ...data, picture: url });
            }
          });
        });
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            margin: "10px",
            padding: "20px",
          }}
        >
          Register
        </Typography>
        <Avatar
          sx={{
            margin: "20px",
            padding: "20px",
          }}
        >
          <HowToReg />
        </Avatar>
        <TextField
          type="text"
          placeholder="Enter the userName"
          required
          label="userName"
          name="userName"
          value={data.userName}
          onChange={handleChange}
          sx={{
            marginBottom: "15px",
            height: "50px",
          }}
        ></TextField>
        <TextField
          type="email"
          placeholder="Enter the Email"
          required
          label="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          sx={{
            marginBottom: "25px",
            height: "50px",
          }}
        />

        <TextField
          type="email"
          placeholder="Enter the Password"
          required
          label="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          sx={{
            marginBottom: "25px",
            height: "50px",
          }}
        />
        <TextField
          type="text"
          placeholder="Enter bio"
          label="description"
          name="description"
          required
          value={data.description}
          onChange={handleChange}
          sx={{
            marginBottom: "25px",
            height: "50px",
          }}
        />
        <div
          className="blog-image"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            placeholder
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          ></input>
          <button
            type="submit"
            onClick={uploadImage}
            style={{
              width: "150px",
              backgroundColor: "red",
              color: "yellow",
            }}
          >
            Upload Image
          </button>{" "}
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "20px",
            paddingTop: "10px",
          }}
        >
          REGISTER
        </Button>
      </Container>
    </form>
  );
};
export default Register;
