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
import userSchema from './models/userSchema.js';
// import ChatRouter from "./routes/ChatRoutes.js";
// import sockets from "./sockets/routes.js";

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
// app.use("/api/chat", ChatRouter);

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
    origin: ["http://localhost:3000"],
    cors: true,
    // methods: ["GET", "POST"]
  }
});

//to create socketId according t email incoming
const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("User", emailId, "Joined Room", roomId);
    emailToSocketMapping.set(emailId, socket.id);
    socketToEmailMapping.set(socket.id, emailId);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    console.log('joineddddd');
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });

  socket.on("call-user", (data) => {
    const { emailId, offer } = data;
    const fromEmail = socketToEmailMapping.get(socket.id);
    const socketId = emailToSocketMapping.get(emailId);
    socket.to(socketId).emit('incoming-call', { from: fromEmail, offer })
  });

  socket.on("call-accepted", (data) => {
    const { emailId, ans } = data;
    const socketId = emailToSocketMapping.get(emailId);
    socket.to(socketId).emit("call-accepted", { ans })
  });
});

//connecting with an event & event listener
// io.on('connection', (socket) => {
//   socket.emit('me', socket.id);
//   console.log('socket connected');

//   socket.on('disconnect', () => {
//     socket.broadcast.emit('callEnded');
//   })

//   socket.on('callUser', ({ userToCall, signalData, from, name }) => {
//     console.log(userToCall);
//     console.log(signalData);
//     console.log(from);
//     console.log(name);

//     userSchema.findOne({ email: from}).then((user) => {
//       console.log(user);
//       io.to(user.socketId).emit("callUser", {
//         signal: signalData,
//         from,
//         name,
//       });
//     });
//   });
//     // io.to(userToCall).emit('callUser', { signal: signalData, from, name })
//   // })

//   socket.on('answerCall', (data) => {
//     io.to(data.to).emit('callAccepted', data.signal);
//   })
// })