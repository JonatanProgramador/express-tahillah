import mongoose, { Schema } from "mongoose";
import SessionInterface from "../../interfaces/SessionInterface";
import { mongo } from "mongoose";
import MongoDB from "../../libs/MongoDB";
import http from 'http';


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

    static async getById(id: string): Promise<SessionInterface | null | Number> {
        try {
            const model = mongoose.model(this.collection, this.sessionSchema);
            const result: SessionInterface | null = await model.findById(id);
            return result;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) return 404;
            return 500;
        }
    }

    static async exists(id: string) {
        const result = await this.find("idUser", id, true);
        if (result !== null)
            return result.length > 0 ? true : false;
        else
            return null;
    }

    //TODO. puedo eliminar esta funcion ya que en getAll usa el mismo codigo.
    static async find(key: string, value: string, precise: boolean): Promise<SessionInterface[] | null> {
        try {
            const model = mongoose.model(this.collection, this.sessionSchema);
            const result: SessionInterface[] = await model.find({ [key]: precise ? value : { $regex: value, $options: "i" } });
            return result;
        } catch (error) {
            return null;
        }
    }

    static async updateRow(session: SessionInterface, id: string) {
        try {
            const model = mongoose.model(this.collection, this.sessionSchema);
            const result = await model.findByIdAndUpdate(id, session);
            return true;
        } catch (error) {
            if (error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if (MongoDB.reconnectDB === null) MongoDB.init();
            }
            return false;
        }
    }

    static async listenSession(io: http.Server) {
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

            });

        } catch (error) {
            if (error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if (MongoDB.reconnectDB === null) MongoDB.init();
            }
        }
    }

}

export default SessionModel;