"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SessionModel_1 = __importDefault(require("../models/mongoDB/SessionModel"));
const socket_io_1 = require("socket.io");
const init_1 = __importDefault(require("../init"));
class MongoDB {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Iniciado conexion db");
            const isConnectDB = yield MongoDB.connectDB();
            if (isConnectDB)
                yield MongoDB.startListers(init_1.default);
        });
    }
    static connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield mongoose_1.default.connect((_a = process.env.CLUSTER) !== null && _a !== void 0 ? _a : "", { serverSelectionTimeoutMS: 5000 });
                if (MongoDB.reconnectDB)
                    clearInterval(MongoDB.reconnectDB);
                MongoDB.reconnectDB = null;
                return true;
            }
            catch (error) {
                console.error("error al conectar a la base de datos");
                if (this.reconnectDB === null) {
                    console.error("Iniciando reconexion");
                    MongoDB.reconnectDB = setInterval(MongoDB.init, 6000);
                }
                return false;
            }
        });
    }
    static startListers(app) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("se ha conectado a la db, iniciando listers");
            const io = new socket_io_1.Server(app, {
                cors: {
                    origin: process.env.ORIGIN_CORS,
                }
            });
            yield SessionModel_1.default.listenSession(io);
        });
    }
}
MongoDB.reconnectDB = null;
exports.default = MongoDB;
