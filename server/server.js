const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Leaderboard = require("./models/Leaderboard"); // Add this line to import the Leaderboard model

const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 4000;

const SECRET_KEY = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.post("/api/auth/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send({ message: "User created" });
  } catch (error) {
    res.status(500).send({ message: "Error signing up", error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.send({ message: "Logged in" });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).send({ message: "Error logging in", error: error.message });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Logged out" });
});

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "Not authenticated" });
  }
  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token", error: error.message });
  }
};

app.post("/api/updateScore", authenticate, async (req, res) => {
  const { difficulty, time } = req.body;
  if (!difficulty || !time) {
    return res
      .status(400)
      .send({ message: "Difficulty and time are required" });
  }

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (
      !user.fastestScores[difficulty] ||
      time < user.fastestScores[difficulty]
    ) {
      user.fastestScores[difficulty] = time;
      await user.save();

      await Leaderboard.findOneAndUpdate(
        { username: user.username, difficulty },
        { score: time },
        { upsert: true, new: true }
      );
    }

    res.send({ message: "Score updated", fastestScores: user.fastestScores });
  } catch (error) {
    console.error("Error updating score", error);
    res
      .status(500)
      .send({ message: "Error updating score", error: error.message });
  }
});

app.get("/api/leaderboard/:difficulty", async (req, res) => {
  const { difficulty } = req.params;
  const difficultyKey = difficulty.toLowerCase(); // Convert difficulty to lowercase to match the field names
  try {
    const users = await User.find(
      { [`fastestScores.${difficultyKey}`]: { $exists: true, $ne: null } }, // Ensure the field exists and is not null
      { username: 1, [`fastestScores.${difficultyKey}`]: 1 }
    )
      .sort({ [`fastestScores.${difficultyKey}`]: 1 })
      .limit(5);

    const leaderboard = users.map((user) => ({
      username: user.username,
      score: user.fastestScores[difficultyKey],
    }));

    res.send(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    res
      .status(500)
      .send({ message: "Error fetching leaderboard", error: error.message });
  }
});

app.get("/api/auth/checkAuth", authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
