import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js' //her we are changing the name of router to userRouter to avoid naming confusion
import authRouter from './routes/auth.route.js'
dotenv.config();



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB!')
}).catch((err)=> {
    console.log(err)
})

const app = express()

app.use(express.json());//thi is going to allow json as an input of the server





app.listen(3000, () => {
    console.log('Server is running on port 3000!!')
})



app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);


//middleware for the error(next)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })

})