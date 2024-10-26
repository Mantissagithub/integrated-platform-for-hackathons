const {z} = require("zod");

const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6, {message : "Passwords msut be at least chars long"}),
});

const signupSchema = z.object({
    
})