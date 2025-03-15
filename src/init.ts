import express, { Application } from 'express';
import ENV from './env';
import Router from './routes/router';

let app:Application = express();
app = Router.getRoutes(app);
const serverMessage = "Servidor iniciado...";


app.listen(ENV.port, ENV.host,()=>{console.log(serverMessage);});