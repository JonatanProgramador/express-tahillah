import { Request, Response } from "express";
import UserRequest from "../request/UserRequest";
import UserModel from "../models/mongoDB/UserModel";
import UserInterface from "../interfaces/UserInterface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserResourcer from "../resourcers/UserResourcer";
import SearchRequest from "../request/SearchRequest";


class UserController {

    static async search(req: Request, res: Response) {
        const validate = SearchRequest.validate(req.body);
        if (validate.success) {
            const users = await UserModel.find(validate.data.key, validate.data.value, validate.data.precise);
            users === null ? res.status(500).send("Error en el servidor") : res.json(UserResourcer.format(users));
        } else {
            res.status(400).send("datos invalidos");
        }

    }

    static async delete(req: Request, res: Response) {
        const rowDelete = await UserModel.delete(req.params.id);
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
    }

    static async getAll(req: Request, res: Response) {
        const rows = await UserModel.getAll();
        rows ? res.json(UserResourcer.format(rows)) : res.status(500).send("Error en el servidor");
    }

    static async create(req: Request, res: Response): Promise<void> {
        const userValidate = UserRequest.validate(req.body);
        if (userValidate.success) {
            const newUser = userValidate.data as UserInterface;
            const existsUser = await UserModel.exists(newUser.name);
            if (!existsUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                const result = await UserModel.createRow(newUser);
                result ? res.status(201).send("Se ha creado el usuario") : res.status(500).send("Error en el servidor");
            } else {
                existsUser === null ? res.status(500).send("Error en el servidor") : res.status(409).send("El nombre ya existe");
            }
        } else {
            res.status(400).send("Error al pasar los datos");
        }
    }


    static async login(req: Request, res: Response) {
        if (req.headers.authorization) {

            const nameUser = atob(req.headers.authorization.slice(6,)).split(":")[0];
            const passwordUser = atob(req.headers.authorization.slice(6,)).split(":")[1];
            const loginData = UserRequest.validate({ name: nameUser, password: passwordUser });

            if (loginData.success) {
                const existsUser = await UserModel.exists(loginData.data.name);
                if (existsUser) {
                    const user = await UserModel.findByName(loginData.data.name);
                    if (user) {
                        if (await bcrypt.compare(loginData.data.password, user.password)) {
                            const token = jwt.sign({ ...UserResourcer.format([user])[0] }, process.env.KEY_JWT ?? "", { expiresIn: '1h' });
                            res.cookie('token', token, {
                                httpOnly: true,
                                sameSite: process.env.DEVELOP === "true" ? "strict" : "none",
                                secure: process.env.DEVELOP !== "true", //se cambia si pasa a producion
                                maxAge: 3600000
                            }).json({ message: "Login correcto" });
                        } else {
                            res.status(401).send("Error en la autentificación");
                        }
                    } else {
                        res.status(500).send("Error en el servidor");
                    }
                } else {
                    existsUser === null ? res.status(500).send("Error en el servidor") : res.status(401).send("Error en la autentificación");

                }
            } else {
                res.status(400).send("Error al pasar los datos");
            }
        } else {
            res.status(400).send("Error al pasar los datos");
        }
    }

    static async isLogin(req: Request, res: Response) {
        const cookie = req.cookies.token;
        res.send("" + req.body.levelUser)
    }

    static async logout(req: Request, res: Response) {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: process.env.DEVELOP === "true" ? "strict" : "none",
            secure: process.env.DEVELOP !== "true", //se cambia si pasa a producion
        }).send("true");
    }

}

export default UserController;