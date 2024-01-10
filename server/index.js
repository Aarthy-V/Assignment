const cors = require("cors");
const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const User = require("./models/User");
const Post = require("./models/Post");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = `${process.env.SECRET}`;

const app = express();


const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  `${process.env.MONGODB_URI}`
);

app.post("/register", async (req, res) => {
  console.log(req.body);
  let { username, email, password } = req.body;
  password = bcrypt.hashSync(password, salt);

  try {
    const createdUser = await User.create({ username, email, password });
    res.status(200).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      console.log("User not found");
      res.status(400).json({ error: "User not found" });
    } else {
      console.log(password);
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        foundUser.password
      );
      console.log(password, foundUser.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ error: "Password incorrect" });
      } else {
        jwt.sign({ username, id: foundUser._id }, secret, (err, token) => {
          if (err) {
            res.status(400).json({ error: "Error signing token", err });
          } else {
            res
              .cookie("token", token)
              .status(200)
              .json({ id: foundUser._id, username });
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.get("/auth", (req, res) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    res.status(400).json({ error: "User not logged in" });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(400).json({ error: "Invalid token" });
      } else {
        res.status(200).json(decoded);
      }
    });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "User logged out" });
});

app.post("/createpost", upload.array("image"), async (req, res) => {
  const fileInfo = req.files[0];
  const { title, summary, content } = req.body;
  const { originalname, path } = fileInfo;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = `${path}.${extension}`;
  fs.renameSync(path, newPath);
  console.log(newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, async (err, decoded) => {
    if (err) throw err;
    const createdPost = await Post.create({
      title,
      summary,
      content,
      image: newPath,
      author: decoded.id,
    })
      .then((createdPost) => {
        console.log(createdPost);
        res.status(200).json(createdPost);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err.message });
      });
  });
});

app.get("/blogs", async (req, res) => {
  try {
    const foundPosts = await Post.find().populate("author",["username"]);
    res.status(200).json(foundPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
