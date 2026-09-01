const userModel = require("../models/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req,res) {

    
    const {username,email,password,role = "user"} = req.body;

    const isuserAlreayExits = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(isuserAlreayExits){
        return res.status(409).json({message: "User already exits"});
    }

    const hash = await bcrypt.hash(password, 10);

    const User = await userModel.create({
        username,
        email,
        password: hash,
        role
    });

    const token = jwt.sign({
        id: User._id,
        role: User.role
    },process.env.JWT_SECRET_KEY);

    res.cookie("token", token);

    res.status(201).json({
        message: "User register successfully",
        user:{
            id: User._id,
            username: User.username,
            email: User.email,
            role: User.role
        }
    });
}


async function loginUser(req,res){

    const{identifier,password} = req.body;

        if(!identifier || !password){
        return res.status(400).json({
            message: "Identifier and password required"
        });
    }
    console.log("Identifier received:", identifier);


    const finduser = await userModel.findOne({
        $or:[
            {username:identifier},
            {email:identifier}
        ]
    })

    console.log("User found:", finduser);

    if(!finduser){
        return res.status(404).json({message:"User does not exits, please register yourself"});
    }

    const isMatch = await bcrypt.compare(password, finduser.password);

    if(!isMatch){
        return res.status(401).json({message:"Wrong password, enter the correct password"})
    }
    
    const token = jwt.sign({
        id: finduser._id,
        role: finduser.role
    },process.env.JWT_SECRET_KEY);

    res.cookie("token",token);

    res.status(200).json({
        message:"User login successfully.",
        user:{
            id: finduser._id,
            username: finduser.username,
            email: finduser.email,
            role: finduser.role
        }
    })
}


module.exports = {registerUser,loginUser};