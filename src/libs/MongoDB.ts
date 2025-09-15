import mongoose from "mongoose";
import SessionModel from "../models/mongoDB/SessionModel";
import { Server } from "socket.io";
import http from 'http';
import app from "../init";

class MongoDB {

    static reconnectDB:null|NodeJS.Timeout  = null

    static async init() {
        console.log("Iniciado conexion db");
        const isConnectDB = await MongoDB.connectDB();
        if(isConnectDB)await MongoDB.startListers(app);
    }

    static async connectDB() {
        try {
            await mongoose.connect(process.env.CLUSTER ?? "",{serverSelectionTimeoutMS:5000});
            if(MongoDB.reconnectDB)clearInterval(MongoDB.reconnectDB);
            MongoDB.reconnectDB = null;
            return true;
        } catch (error) {
            console.error("error al conectar a la base de datos");
            if(this.reconnectDB === null) {
                console.error("Iniciando reconexion");
                MongoDB.reconnectDB = setInterval(MongoDB.init, 6000);
            }
            return false;
        }
    }

    static async startListers(app:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
        console.log("se ha conectado a la db, iniciando listers");
        const io = new Server(app, {
          cors: {
            origin: process.env.ORIGIN_CORS,
          }
        });
        await SessionModel.listenSession(io);
    }


}

export default MongoDB;