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
const UserModel_1 = __importDefault(require("../models/mongoDB/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
function createUserAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            name: "battusay",
            password: yield bcrypt_1.default.hash("04Battu0287", 10),
            rol: "admin"
        };
        const result = yield UserModel_1.default.createRow(user);
        console.log(result ? "Usuario admin creado" : "Error al crear el usuario admin");
    });
}
dotenv_1.default.config();
createUserAdmin();
