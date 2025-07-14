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
const SessionRequest_1 = __importDefault(require("../request/SessionRequest"));
const SessionModel_1 = __importDefault(require("../models/mongoDB/SessionModel"));
class SessionController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionValidate = SessionRequest_1.default.validate(req.body);
            if (sessionValidate.success) {
                const newSession = sessionValidate.data;
                if (!(yield SessionModel_1.default.exists(newSession.idUser))) {
                    const result = yield SessionModel_1.default.createRow(newSession);
                    result ? res.status(201).send("Se ha creado la sesión") : res.status(500).send("Error al crear el usuario");
                }
                else {
                    res.status(400).send("El usuario ya tiene una sesión creada");
                }
            }
            else {
                res.status(400).send("Error al pasar los datos");
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield SessionModel_1.default.getById(req.params.id);
            res.json(row);
        });
    }
    static searchByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield SessionModel_1.default.find("idUser", req.body.idUser, true);
            row.length > 0 ? res.json(row[0]) : res.status(404).send();
        });
    }
}
exports.default = SessionController;
