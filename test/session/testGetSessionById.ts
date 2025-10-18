import request from 'supertest';
import server from '../../src/server';
import { createSession } from './testCreateSession';
import { searchByUser } from './testSearchSessionByUser';
import { deleteSession } from './testDeleteSession';


async function getSessionById(id: String) {
    const res = await request(server).get('/session/' + id);
    return { statusCode: res.statusCode, body: res.body };
}

function testGetSessionById() {

    it("Consulta exitosa(200)", async () => {

        expect((await createSession()).statusCode).toBe(201);

        const session = await searchByUser();
        expect(session.statusCode).toBe(200);
        expect(session.body).toHaveProperty("_id");

        const res = await getSessionById(session.body._id);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');

        expect((await deleteSession())).toBe(200);
    });

    it("Elemento no encontrado(404)", async () => {
        const res = await getSessionById("asd");
        expect(res.statusCode).toBe(404);
    });
}

export { testGetSessionById };