import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import mongoDB from './Database/connection.js';
import path from 'path';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import trainerRoute from './routes/trainerRoute.js';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload'

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json({extended: true, parameterLimit:1000000, limit:'10000kb'}))
app.use(express.urlencoded({extended: true, parameterLimit:1000000, limit:'10000kb'}))

app.use(fileUpload({
  useTempFiles:true
}))

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', userRouter);
app.use('/admin', adminRouter)
app.use('/trainer', trainerRoute)

const port = 5000
const server = http.createServer(app);
try {
  mongoDB().then(() => {
    server.listen(port, () => {
      console.log(`Server successfully connected to ${port}`);
    });
  });
} catch (err) {
  console.log(err);
}