import express, { Application } from 'express';
import ENV from './env';
import Router from './routes/router';
import Middleware from './middleware/middleware';

const app:Application = express();
app.use(express.json()); //cambiar a configuracion
Middleware.addMiddleware(app);
Router.getRoutes(app);
const serverMessage = "Servidor iniciado...";


app.listen(ENV.port, ENV.host,()=>{console.log(serverMessage);});