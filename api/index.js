import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js' //here we are changing the name of router(by default export by user.route.js) to userRouter to avoid naming confusion
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
dotenv.config();



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB!')
}).catch((err)=> {
    console.log(err)
})

const app = express()

app.use(express.json());//this is going to allow json as an input of the server because by default server cant accept json file
app.use(cookieParser()); //allow us to get information from the cookies

 



app.listen(3000, () => {
    console.log('Server is running on port 3000!!')
})



app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);


//middleware for the error(next)     
app.use((err, req, res, next) => { //next is use for go to the next middlerware
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,    //statusCode: statuscode( before ES6)
        message,
    })

})