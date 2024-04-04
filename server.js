const express = require("express");
const { connection } = require("./config/db");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { register } = require("./controllers/userController");
const app = express();
const PostRoute = require("./routes/PostRoute");
const UserRoute = require("./routes/userRoute");
const { verify } = require("./middleware/Authentication");
const { Upload } = require("./controllers/PostController");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "assets/public")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
/* app.post("/api/register", upload.single("picture"), register);
app.post("/api/myposts", upload.single("picture"), verify, Upload); */
app.use("/api/auth", UserRoute);
app.use("/api/posts", PostRoute);
connection();
app.listen(PORT, () => {
  console.log(`server is running on the ${PORT}`);
});
