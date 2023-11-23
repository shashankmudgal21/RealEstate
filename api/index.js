import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import listingRouter from './routes/listing.route.js'
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter);
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error'
  return res.status(statusCode).json({
    sucess:false,
    statusCode,
    message,
  })
})

app.listen(4000, () => {
  console.log("Server is starting on  4000 port");
});

