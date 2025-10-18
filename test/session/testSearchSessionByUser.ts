import request from 'supertest';
import server from '../../src/server';
import { cookie } from '../user/testLoginUser';
import { createSession } from './testCreateSession';
import { deleteSession } from './testDeleteSession';

async function searchByUser(auth?: boolean) {
    const res = await request(server).get('/session/searchByUser').set('cookie', auth ?? true ? cookie : '');
    return { statusCode: res.statusCode, body: res.body };
}

function testSearchSessionByUser() {

    it("Consulta exitosa(200)", async () => {

        expect((await createSession()).statusCode).toBe(201);

        const session = await searchByUser();
        expect(session.statusCode).toBe(200);
        expect(session.body).toHaveProperty("_id");

        expect((await deleteSession())).toBe(200);
    });

    it("Error de autentificación(401)", async () => {
        expect((await searchByUser(false)).statusCode).toBe(401);
    });

    it("No se ha encontrado resultado(404)", async () => {
        expect((await searchByUser()).statusCode).toBe(404);
    });

}

export { searchByUser, testSearchSessionByUser };

