import jwt from "jsonwebtoken";
// import errorHandler  from "./error";

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token) next(errorHandler(403,'unauthorized'));
    jwt.verify(token,process.env.JWT_SECRET,(err,user) =>{
        if(err) next(errorHandler(403,'forbidden'))
        req.user = user;
        next();
    })
}