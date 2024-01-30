import express from "express";
import "dotenv/config"
const app = express();
import mongoose from "mongoose";
import userRoute from "./router/userRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Database Connected"))
.catch((err) => console.log("Error while connecting with Database"));

app.use(bodyParser.urlencoded({extended : false}));

app.use(cookieParser());
// set the view engine as ejs
app.set("view engine" , "ejs");


app.get("/" , (req , res ) => {
    res.send({"msg" : "In User route"});
})

app.use("/user" , userRoute);

app.listen(process.env.PORT , () => {
    console.log(`Server is connected to the port ${process.env.PORT}`);
})  