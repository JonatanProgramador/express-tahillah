import LetterInterface from "../interfaces/letterInterface";
import PraiseInterface from "../interfaces/praiseInterface";
import Json from "../utils/json";


class PraiseModelJson {

    static async getAll():Promise<Array<PraiseInterface>> {
        const data = await Json.readJson('praises.json');
        return  JSON.parse(data);
    }

    static async getById(id:string):Promise<PraiseInterface> {
        const data = await Json.readJson('praises.json');
        const praises:Array<PraiseInterface> = JSON.parse(data);
        const row:PraiseInterface = praises.find((praise:PraiseInterface)=>praise._id === id) as PraiseInterface;
        return row;
    }

    static async createRow(input:PraiseInterface):Promise<boolean> {
        const data = await Json.readJson('praises.json');
        const praises:Array<PraiseInterface> = JSON.parse(data);
        input._id = crypto.randomUUID();
        praises.push(input);
        return await Json.writeJson('praises.json', JSON.stringify(praises));
    }

    static async deleteRow(id:string):Promise<boolean> {
        const data = await Json.readJson('praises.json');
        const praises:Array<PraiseInterface> = JSON.parse(data);
        const newPraises:Array<PraiseInterface> = praises.filter((praise:PraiseInterface)=>praise._id !== id);
        return await Json.writeJson('praises.json', JSON.stringify(newPraises));
    }

    static async updateRow(input:PraiseInterface, id:string):Promise<boolean> {
        const data = await Json.readJson('praises.json');
        const praises:Array<PraiseInterface> = JSON.parse(data);
        const newPraises:Array<PraiseInterface> = praises.map((praise:PraiseInterface)=>praise._id === id?{...praise,...input}:praise);
        return await Json.writeJson('praises.json', JSON.stringify(newPraises));
    }
}

export default PraiseModelJson;