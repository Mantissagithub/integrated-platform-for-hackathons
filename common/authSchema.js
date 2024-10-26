const {z} = require("zod");

//for ref
// const userSchema = new mongoose.Schema({
//     user_id : {type : String, required : true, unique : true, index : true},
//     name : {type : String, required : true},
//     email : {type : String, required : true, unique : true},
//     password : {type : String, required : true},
//     leader : {type : Boolean, required : true, default : false},
//     member : {type : Boolean, required : true, default : true},
//     group_name : {type : String, required : true},
//     group_id : {type : String, required : true, unique : true, index : true},
// }, 
// {timestamps : true},
// );

const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6, {message : "Passwords msut be at least 6  characters long"}),
});

const signupSchema = z.object({
    name: z.string().min(5, { message: "Name must be at least 5 chars long" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Passwords must be at least 6 chars long" }),
    confirmPassword: z.string().min(6, { message: "Passwords must be at least 6 chars long" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

module.exports = {loginSchema, signupSchema};