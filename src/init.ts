import http from 'http';
import server from './server';
import MongoDB from './libs/MongoDB';


//Modulado la configuración del server
const app = http.createServer(server);

//Modulado la conexión y las escuchas de la base de datos
MongoDB.init();



if (process.env.DEVELOP === "true") {
  const serverMessage = `Servidor iniciado en ${process.env.HOST}:${process.env.PORT}`;
  app.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, process.env.HOST ?? "", () => { console.log(serverMessage); });
} else {
  app.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, () => { console.log("Modo producion") });
}





