import request from 'supertest';
import server from '../../src/server';
import { cookie } from '../user/testLoginUser';
import { searchByUser } from './testSearchSessionByUser';
import { deleteSession } from './testDeleteSession';

const completeData = { idPraise: "68543a0696b9431c8fe345da" };


async function createSession(idPraise?: object, auth?: boolean) {
    const res = await request(server).post('/session').send(idPraise ?? completeData).set('cookie', auth ?? true ? cookie : '');
    return { statusCode: res.statusCode, body: res.body };
}

function testCreateSession() {

    it("Creación del elemento exitoso(201)", async () => {
        const result = await createSession();
        expect(result.statusCode).toBe(201);
        const session = await searchByUser();
        expect(session.statusCode).toBe(200);
        expect(session.body).toHaveProperty("_id");
        expect(await deleteSession(session.body._id)).toBe(200);
    });

    it("Creación del elemento exitoso con parametros de mas(201)", async () => {
        const result = await createSession({ ...completeData, cosa: "cosa" });
        expect(result.statusCode).toBe(201);
        const session = await searchByUser();
        expect(session.statusCode).toBe(200);
        expect(session.body).toHaveProperty("_id");
        expect(session.body).not.toHaveProperty("cosa");
        expect(await deleteSession(session.body._id)).toBe(200);
    });

    it("Error en los parametros del body(400)", async () => {
        const result = await createSession({});
        if (result.statusCode === 201) {
            const session = await searchByUser();
            expect(session.statusCode).toBe(200);
            expect(session.body).toHaveProperty("_id");
            expect(session.body).not.toHaveProperty("cosa");
            expect(await deleteSession(session.body._id)).toBe(200);
        }
        expect(result.statusCode).toBe(400);
    });

    it("Error de autentificación(401)", async () => {
        const result = await createSession(undefined, false);
        if (result.statusCode === 201) {
            const session = await searchByUser();
            expect(session.statusCode).toBe(200);
            expect(session.body).toHaveProperty("_id");
            expect(session.body).not.toHaveProperty("cosa");
            expect(await deleteSession(session.body._id)).toBe(200);
        }
        expect(result.statusCode).toBe(401);
    });

    it("Sesión ya creada(409)", async () => {
        const result = await createSession();
        expect(result.statusCode).toBe(201);
        const session = await searchByUser();
        expect(session.statusCode).toBe(200);
        expect(session.body).toHaveProperty("_id");
        expect((await createSession()).statusCode).toBe(409);
        expect(await deleteSession(session.body._id)).toBe(200);
    });

}

export { createSession, testCreateSession };