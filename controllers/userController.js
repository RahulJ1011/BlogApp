const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();
const register = async (req, res) => {
  try {
    const { userName, email, password, picture, description } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({ msg: "This emailId already exists" });
    } else {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      if (!password) {
        return res.status(400).json({ msg: "Password is required" });
      }
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
        picture,
        description,
      });
      const savedUser = await newUser.save();
      return res.status(200).json(savedUser);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "emailId does not exist" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(403).json({ msg: "Wrong user credentials" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      delete user.password;
      return res.status(200).json({ user, token });
    }
  } catch (err) {
    return res.status(403).json({ err: err.message });
  }
};

module.exports = { register, login };
