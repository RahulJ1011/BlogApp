const Post = require("../models/posts");
const User = require("../models/user");

const Upload = async (req, res) => {
  try {
    const { userId, userName, description, picture } = req.body;
    console.log(userId, userName, description, picture);
    const user = await User.findById(userId);

    const upload = new Post({
      userId,
      userName,
      picture,
      description,
    });

    const setPost = await upload.save();
    if (user) {
      return res.status(200).json({
        userName,
        profile: user.picture,
        picture,
        description,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
const displayPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(201).json(posts);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

const Myposts = async (req, res) => {
  try {
    const { userId } = req.params;
    const check = await Post.find({ userId });
    return res.status(201).json(check);
  } catch (err) {
    return res.status(400).json({ msg: "not found" });
  }
};

module.exports = { Upload, displayPosts, Myposts };
