import express, { Application } from 'express';
import Router from './routes/Router';
import AddMiddleware from './middleware/AddMiddleware';
import cors from 'cors';
import cookieParse from 'cookie-parser';
import dotenv from 'dotenv';


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

if (process.env.DEVELOP) {
  const serverMessage = `Servidor iniciado en ${process.env.HOST}:${process.env.PORT}`;
  app.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, process.env.HOST??"", () => { console.log(serverMessage); });
} else {
  app.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, () => { });
}