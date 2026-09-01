const userModel = require("../models/music.model");

async function playall(req, res) {
  try {
    const musics = await userModel.find();

    res.status(200).json({
      message: "All music fetched.",
      musics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching music",
      error,
    });
  }
}

module.exports = { playall };