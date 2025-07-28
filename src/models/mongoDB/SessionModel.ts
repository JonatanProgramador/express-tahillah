import mongoose, { Schema } from "mongoose";
import SessionInterface from "../../interfaces/SessionInterface";
import { Server } from "socket.io";


class SessionModel {

    private static readonly sessionSchema = new Schema({
        idUser: String,
        idPraise: String,
    });

    private static readonly collection = 'sessions';

    static async createRow(session: SessionInterface): Promise<boolean> {
        try {
            const model = mongoose.model(this.collection, this.sessionSchema);
            const result = await model.create(session);
            return result._id && result._id.toString() ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getById(id: string): Promise<SessionInterface | null> {
        try {
            const model = mongoose.model(this.collection, this.sessionSchema);
            const result: SessionInterface | null = await model.findById(id);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async exists(id: string) {
        return (await this.find("idUser", id, true)).length > 0 ? true : false;
    }

    //TODO. puedo eliminar esta funcion ya que en getAll usa el mismo codigo.
    static async find(key: string, value: string, precise: boolean): Promise<SessionInterface[]> {
        try {
            const model = mongoose.model(this.collection, this.sessionSchema);
            const result: SessionInterface[] = await model.find({ [key]: precise ? value : { $regex: value, $options: "i" } });
            return result;
        } catch (error) {
            return [];
        }
    }

    static async updateRow(session: SessionInterface, id: string) {
        try {
            const model = mongoose.model(this.collection, this.sessionSchema);
            const result = await model.findByIdAndUpdate(id, session);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async listenSession(io:Server) {
        try {
            console.log("Ejecutado")
            const model = mongoose.model(this.collection, this.sessionSchema);
            const event = model.watch();
            event.on("change", (change) => {
                const idSession = change.documentKey._id.toString();
                const idPraise = change.updateDescription.updatedFields.idPraise;
                io.emit(idSession, idPraise);
            })

            event.on('error', (err) => {
                console.error("Error en el Change Stream:", err);
            });

        } catch (error) {
            console.log(error);
        }
    }

}

export default SessionModel;