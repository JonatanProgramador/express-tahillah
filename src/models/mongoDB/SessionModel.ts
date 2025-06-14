import mongoose, { Schema } from "mongoose";
import SessionInterface from "../../interfaces/SessionInterface";


class SessionModel {

    private static readonly sessionSchema = new Schema({
            idUser: String,
            idPraise: String,
        });

    private static readonly collection = 'sessions';

    static async createRow(session: SessionInterface): Promise<boolean> {
            try {
               
                await mongoose.connect(process.env.CLUSTER??"");
                const model = mongoose.model(this.collection, this.sessionSchema);
                const result = await model.create(session);
                mongoose.disconnect();
                return result._id && result._id.toString() ? true : false;
            } catch (error) {
                console.log(error);
                return false;
            }
        }

        static async getById(id:string):Promise<SessionInterface|null> {
                try{
                    await mongoose.connect(process.env.CLUSTER??"");
                    const model = mongoose.model(this.collection, this.sessionSchema);
                    const result:SessionInterface|null = await model.findById(id);
                    mongoose.disconnect();
                    return result;
                    } catch(error) {
                        console.log(error);
                        return null;
                    }
            }

        

}

export default SessionModel;