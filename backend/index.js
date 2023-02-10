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
import { Server } from 'socket.io';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json({ extended: true, parameterLimit: 1000000, limit: '10000kb' }))
app.use(express.urlencoded({ extended: true, parameterLimit: 1000000, limit: '10000kb' }))

app.use(fileUpload({
  useTempFiles: true
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

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);
  console.log('socket connected');

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  })

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name })
  })

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  })
})