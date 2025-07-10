import UserInterface from "../interfaces/UserInterface";
import UserModel from "../models/mongoDB/UserModel";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";


async function createUserAdmin() {

    const user = {
        name:"",
        password:await bcrypt.hash("",10),
        rol:"admin"
    };

    const result = await UserModel.createRow(user as UserInterface);

    console.log(result?"Usuario admin creado":"Error al crear el usuario admin");
}

dotenv.config();
createUserAdmin();