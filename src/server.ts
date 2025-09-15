import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AddMiddleware from './middleware/AddMiddleware';
import Router from './routes/Router';

dotenv.config();

const server: Application = express();
server.use(cors({
  origin: process.env.ORIGIN_CORS,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
server.use(cookieParser());
server.use(express.json());
AddMiddleware.add(server);
Router.getRoutes(server);

export default server;