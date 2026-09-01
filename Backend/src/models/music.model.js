const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    uri:{
        type:String,
        require:true
    },
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }
    

})


const MusicSchema = mongoose.model("music",userSchema);

module.exports = MusicSchema;