import { Request, Response } from "express";
import UserRequest from "../request/UserRequest";
import UserModel from "../models/mongoDB/UserModel";
import UserInterface from "../interfaces/UserInterface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserResourcer from "../resourcers/UserResourcer";


class UserController {

    static async create(req: Request, res: Response): Promise<void> {
        const userValidate = UserRequest.validate(req.body);
        if (userValidate.success) {
            const newUser = userValidate.data as UserInterface;
            if (!await UserModel.exists(newUser.name)) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                const result = await UserModel.createRow(newUser);
                result ? res.status(201).send("Se ha creado el usuario") : res.status(500).send("Error al crear el usuario");
            } else {
                res.status(400).send("El nombre ya existe");
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
                if (await UserModel.exists(loginData.data.name)) {
                    const user = await UserModel.findByName(loginData.data.name);
                    if (user) {
                        if (await bcrypt.compare(loginData.data.password, user.password)) {
                            const token = jwt.sign({ ...UserResourcer.format(user) }, process.env.KEY_JWT ?? "", { expiresIn: '1h' });
                            res.cookie('token', token, {
                                httpOnly: true,
                                sameSite: process.env.DEVELOP === "true" ? "strict" : "none",
                                secure: process.env.DEVELOP !== "true", //se cambia si pasa a producion
                                maxAge: 3600000
                            }).json({ message: "Login correcto" });
                        } else {
                            res.status(401).send("Error en la contraseña");
                        }
                    } else {
                        res.status(500).send("Error en el servidor");
                    }
                } else {
                    res.status(401).send("Error en el usuario");
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
        res.send(""+req.body.levelUser)
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