import mongoose, { Schema } from "mongoose";
import UserInterface from "../../interfaces/UserInterface";


class UserModel {

    private static readonly userSchema = new Schema({
        name: String,
        password: String,
        rol: String
    });

    private static readonly collection = 'users';

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
            console.log(error);
            return false;
        }
    }

    static async exists(name: string) {
        try {
            const model = mongoose.model(this.collection, this.userSchema);
            const result = await model.find({ name: name });
            return result.length > 0;
        } catch (error) {
            return false;
        }
    }

    static async findByName(name: string): Promise<UserInterface | undefined> {
        try {
          //  await mongoose.connect(process.env.CLUSTER??"");
            const model = mongoose.model(this.collection, this.userSchema);
            const result: UserInterface[] = await model.find({ name: name });
          //  mongoose.disconnect();
            return result[0];
        } catch (error) {
            return undefined;
        }
    }
}

export default UserModel;