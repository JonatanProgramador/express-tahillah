import mongoose, { mongo, Schema } from "mongoose";
import UserInterface from "../../interfaces/UserInterface";
import MongoDB from "../../libs/MongoDB";


class UserModel {

    private static readonly userSchema = new Schema({
        name: String,
        password: String,
        rol: String
    });

    private static readonly collection = 'users';

   static async getAll(): Promise<UserInterface[]|null> {
        try {
            const model = mongoose.model(this.collection, this.userSchema);
            const result: UserInterface[] = await model.find();
            return result;
        } catch (error) {
            if(error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if(MongoDB.reconnectDB === null)MongoDB.init();
            }
            return null;
        }
    }

    static async createRow(user: UserInterface): Promise<boolean> {
        try {
            if (!user.rol) {
                console.log("rol vacio asignandole un valor por defecto");
                user.rol = "user";
            }
            const model = mongoose.model(this.collection, this.userSchema);
            const result = await model.create(user);
            return result._id && result._id.toString() ? true : false;
        } catch (error) {
            if (error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if (MongoDB.reconnectDB === null) MongoDB.init();
            }
            return false;
        }
    }

    static async exists(name: string) {
        try {
            const model = mongoose.model(this.collection, this.userSchema);
            const result = await model.find({ name: name });
            return result.length > 0;
        } catch (error) {
            if (error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if (MongoDB.reconnectDB === null) MongoDB.init();
            }
            return null;
        }
    }


    static async findByName(name: string): Promise<UserInterface | null> {
        try {
            const model = mongoose.model(this.collection, this.userSchema);
            const result: UserInterface[] = await model.find({ name: name });
            return result[0];
        } catch (error) {
            if (error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if (MongoDB.reconnectDB === null) MongoDB.init();
            }
            return null;
        }
    }
}

export default UserModel;