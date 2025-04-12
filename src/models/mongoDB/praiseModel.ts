import mongoose, { Schema } from "mongoose";
import PraiseInterface from "../../interfaces/praiseInterface";
import ENV from "../../env";


class PraiseModel {

    private static readonly letterSchema = new Schema({
        id:Number,
        type:String,
        summary:String,
        letter:String
    });

    private static readonly praiseSchema = new Schema({
        title:String,
        type:String,
        tone:String,
        letters:[this.letterSchema]
    });

    private static readonly uri = `mongodb://${ENV.configDB.host}:${ENV.configDB.port}/${ENV.configDB.database}`;
    

    static async createRow(praise:PraiseInterface):Promise<boolean> {
        try{
        await mongoose.connect(this.uri);
        const model = mongoose.model('praise', this.praiseSchema);
        const result = await model.create(praise);
        console.log(result._id.toString());
        mongoose.disconnect();
        return result._id.toString() !== '';
        } catch(error) {
            return false;
        }
    }

    static async getAll():Promise<PraiseInterface[]> {
        try{
            await mongoose.connect(this.uri);
            const model = mongoose.model('praise', this.praiseSchema);
            const result:PraiseInterface[] = await model.find();
            mongoose.disconnect();
            return result;
            } catch(error) {
                console.log(error);
                return [];
            }
    }

    static async getById(id:string):Promise<PraiseInterface|null> {
        try{
            await mongoose.connect(this.uri);
            const model = mongoose.model('praise', this.praiseSchema);
            const result:PraiseInterface|null = await model.findById(id);
            mongoose.disconnect();
            return result;
            } catch(error) {
                console.log(error);
                return null;
            }
    }

    static async deleteRow(id:string) {
        try{
            await mongoose.connect(this.uri);
            const model = mongoose.model('praise', this.praiseSchema);
            const result = await model.findByIdAndDelete(id);
            mongoose.disconnect();
            return result;
            } catch(error) {
                console.log(error);
                return [];
            }
    }

    static async updateRow(praise:PraiseInterface, id:string) {
        try{
            await mongoose.connect(this.uri);
            const model = mongoose.model('praise', this.praiseSchema);
            const result = await model.findByIdAndUpdate(id, praise);
            mongoose.disconnect();
            return result;
            } catch(error) {
                console.log(error);
                return [];
            }
    }

}

export default PraiseModel;