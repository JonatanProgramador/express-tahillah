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
const UserRequest_1 = __importDefault(require("../request/UserRequest"));
const UserModel_1 = __importDefault(require("../models/mongoDB/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserResourcer_1 = __importDefault(require("../resourcers/UserResourcer"));
class UserController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userValidate = UserRequest_1.default.validate(req.body);
            if (userValidate.success) {
                const newUser = userValidate.data;
                if (!(yield UserModel_1.default.exists(newUser.name))) {
                    newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
                    const result = yield UserModel_1.default.createRow(newUser);
                    result ? res.status(201).send("Se ha creado el usuario") : res.status(500).send("Error al crear el usuario");
                }
                else {
                    res.status(400).send("El nombre ya existe");
                }
            }
            else {
                res.status(400).send("Error al pasar los datos");
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (req.headers.authorization) {
                const nameUser = atob(req.headers.authorization.slice(6)).split(":")[0];
                const passwordUser = atob(req.headers.authorization.slice(6)).split(":")[1];
                const loginData = UserRequest_1.default.validate({ name: nameUser, password: passwordUser });
                if (loginData.success) {
                    if (yield UserModel_1.default.exists(loginData.data.name)) {
                        const user = yield UserModel_1.default.findByName(loginData.data.name);
                        if (user) {
                            if (yield bcrypt_1.default.compare(loginData.data.password, user.password)) {
                                const token = jsonwebtoken_1.default.sign(Object.assign({}, UserResourcer_1.default.format(user)), (_a = process.env.KEY_JWT) !== null && _a !== void 0 ? _a : "", { expiresIn: '1h' });
                                res.cookie('token', token, {
                                    httpOnly: true,
                                    sameSite: process.env.DEVELOP === "true" ? "strict" : "none",
                                    secure: process.env.DEVELOP !== "true", //se cambia si pasa a producion
                                    maxAge: 3600000
                                }).json({ message: "Login correcto" });
                            }
                            else {
                                res.status(401).send("Error en la contraseña");
                            }
                        }
                        else {
                            res.status(500).send("Error en el servidor");
                        }
                    }
                    else {
                        res.status(401).send("Error en el usuario");
                    }
                }
                else {
                    res.status(400).send("Error al pasar los datos");
                }
            }
            else {
                res.status(400).send("Error al pasar los datos");
            }
        });
    }
    static isLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.token;
            res.send("" + req.body.levelUser);
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token', {
                httpOnly: true,
                sameSite: process.env.DEVELOP === "true" ? "strict" : "none",
                secure: process.env.DEVELOP !== "true", //se cambia si pasa a producion
            }).send("true");
        });
    }
}
exports.default = UserController;
