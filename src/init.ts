import express, { Application } from 'express';
import ENV from './env';
import Router from './routes/router';
import Middleware from './middleware/middleware';
import cors from 'cors';

const app:Application = express();
app.use(cors({
    origin: `http://192.168.1.99:5173`,  
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }))
app.use(express.json()); //cambiar a configuracion
Middleware.addMiddleware(app);
Router.getRoutes(app);
const serverMessage = "Servidor iniciado...";


app.listen(ENV.port, ENV.host,()=>{console.log(serverMessage);});