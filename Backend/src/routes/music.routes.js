const express = require("express");

const Music = require("../controllers/music.controllers");
const Album = require("../controllers/musicalbum.controllers");
const getall = require("../controllers/allmusic.controllers");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "upload/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

router.post(
  "/upload",
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  Music.CreateMusic,
);

router.post("/album", upload.array("music", 10), Album.CreateAlbum);

router.get("/Playall", getall.playall);

module.exports = router;
