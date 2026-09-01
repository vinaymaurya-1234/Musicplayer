const jwt = require("jsonwebtoken");
const MusicSchema = require("../models/music.model");
const { uploadFile } = require("../service/storage.service");
require("dotenv").config();

async function CreateMusic(req, res) {
  const title = req.body.title;
  // console.log(title,"aaa");
  const token = req.cookies.token;
  // console.log(req.file);

  // console.log("FILE RECEIVED:", req.file);

  if (!token) {
    console.log(token);
    return res.status(400).json({ message: "Restrected" });
  }

  let verifiedtoken;

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    verifiedtoken = decoded;
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }

  console.log(verifiedtoken,"123");
  if (verifiedtoken.role != "artist") {
    return res
      .status(404)
      .json({ message: "Forbidden, you are not an artist." });
  }

   if (!req.file) {
  return res.status(400).json({
    message: "Music file required"
  });
}

  const musiclink = await uploadFile(req.file);

 
  const uri = musiclink.url;
  // console.log(musiclink,"333");
  // console.log(uri,"444");

  const music = await MusicSchema.create({
    title,
    uri,
    artist:verifiedtoken.id
  })

  return res.status(200).json({ message: "Login as artist." });
}

module.exports = { CreateMusic };
