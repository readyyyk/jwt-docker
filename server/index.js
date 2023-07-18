import express from 'express';
import cors from 'cors';
import userMgr from "./userMgr/userMgr.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;

const expressApp = express();
expressApp.use(express.json());
expressApp.use(cors());
expressApp.use(cookieParser());


function log(req, _, next) {
    console.log(new Date().toLocaleString("RU"), "  -  ", req.url);
    next();
}


expressApp.post("/login", log, userMgr.login);
expressApp.post("/register", log, userMgr.register);
expressApp.get("/myData", log, userMgr.getMyData);
expressApp.get("/users/:userId(\\d+)", log, userMgr.getUserData);

try {
    expressApp.listen(PORT, ()=>console.log(`Server is on :${PORT}`));
} catch (e) {
    console.error(`Error listening :${PORT}`, e);
}
