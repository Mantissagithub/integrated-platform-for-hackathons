const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const supertokens = require("supertokens-node");
const {middleware} = require("supertokens-node/framework/express")

const app = express();

app.use(cors());
app.use(express.json());

const jwt_secret = process.env.JWT_SECRET || "S3Cr3t";
const PORT = process.env.PORT || 3000;

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
    group_name : {type : String, required : true},
    group_id : {type : String, required : true, unique : true, index : true},
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});