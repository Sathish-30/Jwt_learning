import jwt from "jsonwebtoken";
import "dotenv/config"

const auth = (req , res , next) => {
    // Grab token from cookies
    console.log(req.cookies);
    const {token} = req.cookies;
    // If no token stop here
    if(!token){
        res.status(403).redirect("login");
    }
    
    // Decode the cookie and get id
    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET_KEY);
        console.log(decode);
        req.user = decode;
    }catch(err){
        console.log(err);
        res.status(401).send("Invalid Token");
    }
    // Query to DB for that user id
    // Next is like relay race need to be passed
    next(); 
}

export default auth;