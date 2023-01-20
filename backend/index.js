import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', userRouter);
app.use('/admin', adminRouter)


const MONGODB_URL = "mongodb+srv://dilip_d:9311591685@cluster0.ni6eisu.mongodb.net/C-Fit?retryWrites=true&w=majority"
const port = 5000 

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URL).then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`))
}).catch((error) => console.log(`${error} did not connect`))