import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/userRoute.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/users', userRouter); 

const MONGODB_URL = "mongodb+srv://dilip_d:9311591685@cluster0.ni6eisu.mongodb.net/C-Fit?retryWrites=true&w=majority"
const port = 5000 

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URL).then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`))
}).catch((error) => console.log(`${error} did not connect`))