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

//user : name, email, password(hashed), 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});