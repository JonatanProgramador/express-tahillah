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
const SearchRequest_1 = __importDefault(require("../request/SearchRequest"));
class UserController {
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validate = SearchRequest_1.default.validate(req.body);
            if (validate.success) {
                const users = yield UserModel_1.default.find(validate.data.key, validate.data.value, validate.data.precise);
                users === null ? res.status(500).send("Error en el servidor") : res.json(UserResourcer_1.default.format(users));
            }
            else {
                res.status(400).send("datos invalidos");
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rowDelete = yield UserModel_1.default.delete(req.params.id);
            switch (rowDelete) {
                case 200:
                    res.send("Se ha eliminado el usuario");
                    break;
                case 404:
                    res.status(404).send("No se ha encontrado resultados");
                    break;
                default:
                    res.status(500).send("Error del servidor");
                    break;
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield UserModel_1.default.getAll();
            rows ? res.json(UserResourcer_1.default.format(rows)) : res.status(500).send("Error en el servidor");
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userValidate = UserRequest_1.default.validate(req.body);
            if (userValidate.success) {
                const newUser = userValidate.data;
                const existsUser = yield UserModel_1.default.exists(newUser.name);
                if (!existsUser) {
                    newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
                    const result = yield UserModel_1.default.createRow(newUser);
                    result ? res.status(201).json(result) : res.status(500).send("Error en el servidor");
                }
                else {
                    existsUser === null ? res.status(500).send("Error en el servidor") : res.status(409).send("El nombre ya existe");
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
                    const existsUser = yield UserModel_1.default.exists(loginData.data.name);
                    if (existsUser) {
                        const user = yield UserModel_1.default.findByName(loginData.data.name);
                        if (user) {
                            if (yield bcrypt_1.default.compare(loginData.data.password, user.password)) {
                                const token = jsonwebtoken_1.default.sign(Object.assign({}, UserResourcer_1.default.format([user])[0]), (_a = process.env.KEY_JWT) !== null && _a !== void 0 ? _a : "", { expiresIn: '1h' });
                                res.cookie('token', token, {
                                    httpOnly: true,
                                    sameSite: process.env.DEVELOP === "true" ? "strict" : "none",
                                    secure: process.env.DEVELOP !== "true", //se cambia si pasa a producion
                                    maxAge: 3600000
                                }).json({ message: "Login correcto" });
                            }
                            else {
                                res.status(401).send("Error en la autentificación");
                            }
                        }
                        else {
                            res.status(500).send("Error en el servidor");
                        }
                    }
                    else {
                        existsUser === null ? res.status(500).send("Error en el servidor") : res.status(401).send("Error en la autentificación");
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
