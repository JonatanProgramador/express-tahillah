import UserInterface from "../interfaces/UserInterface";
import MongoDB from "../libs/MongoDB";
import UserModel from "../models/mongoDB/UserModel";
import bcrypt from 'bcrypt';


async function createUserAdmin() {

    const user = {
        name: "",
        password: "",
        rol: "admin"
    };

    if (process.argv[2] && process.argv[3]) {
        await MongoDB.connectDB();
        user.name=process.argv[2];
        user.password=await bcrypt.hash(process.argv[3], 10);
        const result = await UserModel.createRow(user as UserInterface);

        console.log(result ? "Usuario admin creado" : "Error al crear el usuario admin");
        await MongoDB.desconnectDB();
    } else {
        console.log("Error en los parametros");
    }
}

createUserAdmin();