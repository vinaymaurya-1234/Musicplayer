const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  uri: {
    type: String,
    required: true,
  },

  thumbnail: {
    type: String,
    default: "",
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const MusicSchema = mongoose.model("music", musicSchema);

module.exports = MusicSchema;