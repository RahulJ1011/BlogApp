const express = require("express");
const { verify } = require("../middleware/Authentication");
const {
  displayPosts,
  Myposts,
  Upload,
} = require("../controllers/PostController");
const router = express.Router();

router.get("/displayPosts", verify, displayPosts);
router.post("/myposts", verify, Upload);
router.get("/:userId/myposts", verify, Myposts);
module.exports = router;
