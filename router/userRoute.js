import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/userSchema.js";
import accessToken from "../helpers/jwtHelper.js";
import auth from "../helpers/auth.js";
const userRoute = express.Router();

userRoute.get("/" , (req , res) => {
    res.send({"msg" : "In User route"});
} )

userRoute.get("/dashboard" , auth, (req , res) => {
    console.log(req.user);
    res.send(req.user);
})

userRoute.get("/logout" , (req , res) => {
    res.clearCookie('token');
    res.send("Cleared cookies");
})

userRoute.get("/signup" , (req , res) => {
    res.render('pages/signUp');
})

userRoute.get("/login" , (req , res) => {
    res.render('pages/login');
})

userRoute.post("/register" , async (req , res) => {
    const {email , password} = req.body;
    if(email && password){
        // Find if the user is already present in the database or not
        const existingUser = await User.findOne({email : email});
        if(existingUser){
            res.status(404).send({"msg" : "User already registered"});
        }else{
                bcrypt.hash(password , 10 , async(err , hash) => {
                const hashedPassword = hash;
                const user = new User({
                    email : email,
                    password : hashedPassword,
                })
                const newUser = await user.save();
                newUser.token = accessToken(newUser);
                newUser.password = undefined;
                console.log(newUser);
                if(newUser) res.status(201).json(user);
            });
        }
    }else{
        res.sendStatus(400).send("All fields are compulsory");
    }
})

userRoute.post("/validate" , async (req , res) => {
    const {email , password} = req.body;
    if(email && password){
        const user = await User.findOne({email : email});
        if(user && bcrypt.compare(password , user.password)){
            const token = accessToken(user);
            user.token = token;
            user.password = password;

            const options = {
                httpOnly : true,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            };
            res.status(200).cookie("token" , token , options ).json({
                    success : true,
                    token,
            });
        }else{
            res.status(404).send({"msg":"User not registered"});
        }    
    }
})


export default userRoute;