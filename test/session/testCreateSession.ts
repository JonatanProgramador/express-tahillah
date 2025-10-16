import request from 'supertest';
import server from '../../src/server';
import { cookie } from '../user/testLoginUser';
import { searchByUser } from './testSearchSessionByUser';

const completeData = {idPraise:"68543a0696b9431c8fe345da"};


async function  createSession(idPraise?:string, auth?:boolean) {
    const res = await request(server).post('/session').send(idPraise??completeData).set('cookie', auth ?? true ? cookie : '');
    return { statusCode: res.statusCode, body: res.body };
}

function testCreateSession() {

    it("Creación del elemento exitoso", async ()=>{
        const result = await createSession();
        expect(result.statusCode).toBe(201);
        const session = await searchByUser();
        expect(session.statusCode).toBe(200);
        expect(session.body).toHaveProperty("_id");
    });

}

export {createSession, testCreateSession};