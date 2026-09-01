const mongoose = require("mongoose");


const albumSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    musics:[{
        type: String,
        required: true,
        ref: "music"
    }],
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
})


const Musicalbum = mongoose.model("musicalbum",albumSchema);

module.exports = Musicalbum;
         