const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const supertokens = require("supertokens-node");
// const {middleware} = require("supertokens-node/framework/express")
const {signupSchema, loginSchema} = require("../common/authSchema");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

const jwt_secret = process.env.JWT_SECRET || "S3Cret";
const PORT = process.env.PORT || 5000;

mongoose
    .connect("mongodb+srv://mantissa6789:Mantis%402510@cluster0.9ramotn.mongodb.net/platform")
    .then(() => console.log("MongoDB connected..."))
    .catch(() => console.log("MongoDB connection failed"));

//user : user_id, name, email, password(hashed), leader, member, group_name, group_id
//group : group_id, name, leader, members, created_at, updated_at, deleted_at, group_password

const userSchema = new mongoose.Schema({
    user_id : {type : String, required : true, unique : true, index : true},
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    leader : {type : Boolean, required : true, default : false},
    member : {type : Boolean, required : true, default : true},
    group_name : {type : String},
    group_id : {type : String, unique : true, index : true},
}, 
{timestamps : true},
);

const groupSchema = new mongoose.Schema({
    group_id : {type : String, required : true, unique : true, index : true},
    name : {type : String, required : true},
    leader : {type : String, required : true},
    members : [{type: mongoose.Schema.Types.ObjectId, ref : 'User'}],
    created_at : {type : Date, required : true, default : Date.now()},
    updated_at : {type : Date, required : true, default : Date.now()},
    group_password : {type : String, required : true},
});

const User = mongoose.model("User", userSchema);
const Group = mongoose.model("Group", groupSchema);

app.post("/signup", async(req, res) => {
    const parseResult = signupSchema.safeParse(req.body);

    if(!parseResult.success){
        const errors = parseResult.error.errors.map(err => ({path : err.path[0], message : err.message}));
        return res.status(400).json({errors});
    }

    const {name, email, password, confirmPassword} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }

        const userId = uuidv4();
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({user_id : userId, name, email, password : hashPassword});
        await newUser.save();

        res.status(200).json({message : "User registered successfully"}); 
    }catch(error){
        res.status(500).json({message : "Internal Error", error});
    }
});

app.post("/login", async(req, res) => {
    const parseResult = loginSchema.safeParse(req.body);

    if(!parseResult.success){
        const errors = parseResult.error.errors.map(err => ({path : err.path[0], message : err.message}));
        return res.status(400).json({errors});
    }

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "User not found registered with this email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message : "Invalid password"});
        }

        const token = jwt.sign({email}, jwt_secret, {expiresIn : '1h'});
        res.status(200).json({message : "User logged in successfully", token});
    } catch (error) {
        return res.status(500).json({message : "Internal Error"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});