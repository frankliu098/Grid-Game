const express = require("express");
const Leaderboard = require("../models/Leaderboard");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, score, difficulty } = req.body;
  try {
    const newEntry = new Leaderboard({ username, score, difficulty });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: "Error saving score" });
  }
});

router.get("/:difficulty", async (req, res) => {
  const { difficulty } = req.params;
  try {
    const scores = await Leaderboard.find({ difficulty })
      .sort({ score: 1 })
      .limit(10);
    res.json(scores);
  } catch (error) {
    res.status(400).json({ message: "Error fetching scores" });
  }
});

module.exports = router;
