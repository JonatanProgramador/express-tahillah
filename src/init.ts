import express, { Application } from 'express';
import Router from './routes/Router';
import AddMiddleware from './middleware/AddMiddleware';
import cors from 'cors';
import cookieParse from 'cookie-parser';
import dotenv from 'dotenv';
import SessionModel from './models/mongoDB/SessionModel';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import http from 'http';


dotenv.config();
const app: Application = express();




app.use(cors({
  origin: process.env.ORIGIN_CORS,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(cookieParse());
app.use(express.json());

AddMiddleware.add(app);
Router.getRoutes(app);

const server = http.createServer(app);
const io = new Server(server , {
  cors: {
    origin: process.env.ORIGIN_CORS, 
  }
});




if (process.env.DEVELOP === "true") {
  const serverMessage = `Servidor iniciado en ${process.env.HOST}:${process.env.PORT}`;
 server.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, process.env.HOST??"", () => { console.log(serverMessage); });
} else {
  server.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, () => {console.log("Modo producion")});
}

mongoose.connect(process.env.CLUSTER ?? "");
SessionModel.listenSession(io);
