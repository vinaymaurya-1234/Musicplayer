const jwt = require("jsonwebtoken");
const Musicalbum = require("../models/album.model");
const {bulkupload} = require("../service/storage.service")

async function CreateAlbum(req, res) {

  let title = req.body.title;

  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Forbidden" });
  }

  let Verifiedtoken;

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    Verifiedtoken = decoded;
    // console.log(decoded);
  } catch (err) {
    console.log(Verifiedtoken);
    return res.status(400).json({ message: "Invalid token." });
    
  }

  if(Verifiedtoken.role != "artist"){
    return res.status(400).json({message:"You cant create album, You are not an artist."});
  }

  const urls = await bulkupload(req.files);

  const Album = await Musicalbum.create({
    title,
    musics:urls,
    artist: Verifiedtoken.id
  })


return res.status(200).json({message:"Successfullll"})
}

module.exports = {CreateAlbum};
