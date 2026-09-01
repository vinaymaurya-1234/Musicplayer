const jwt = require("jsonwebtoken");
const MusicSchema = require("../models/music.model");
const { uploadFile } = require("../service/storage.service");

require("dotenv").config();

async function CreateMusic(req, res) {
  const title = req.body.title;
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Restricted",
    });
  }

  let verifiedtoken;

  try {
    verifiedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }

  if (verifiedtoken.role !== "artist") {
    return res.status(403).json({
      message: "Forbidden, you are not an artist.",
    });
  }

  const musicFile = req.files?.music?.[0];
  const thumbnailFile = req.files?.thumbnail?.[0];

  if (!musicFile) {
    return res.status(400).json({
      message: "Music file required",
    });
  }

  try {
    const musicUpload = await uploadFile(musicFile);

    let thumbnail = "";

    if (thumbnailFile) {
      const imageUpload = await uploadFile(thumbnailFile);
      thumbnail = imageUpload.url;
    }

    const music = await MusicSchema.create({
      title,
      uri: musicUpload.url,
      thumbnail,
      artist: verifiedtoken.id,
    });

    return res.status(200).json({
      message: "Music uploaded successfully.",
      music,
    });
  } catch (err) {
    console.log("Upload error:", err);

    return res.status(500).json({
      message: "Music upload failed",
    });
  }
}

module.exports = { CreateMusic };
