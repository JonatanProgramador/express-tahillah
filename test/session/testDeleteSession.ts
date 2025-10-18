import request from 'supertest';
import server from '../../src/server';
import { cookie } from '../user/testLoginUser';
import { createSession } from './testCreateSession';

async function deleteSession(auth?: boolean) {
    const del = await request(server).delete('/session').set('cookie', auth ?? true ? cookie : '');
    return del.statusCode;
}

function testDeleteSession() {
    it("Eliminación del elemento exitoso(200)", async () => {
        const res = await createSession();
        expect(res.statusCode).toBe(201);
        expect(await deleteSession()).toBe(200);
    });

    it("Error de autentificación(401)", async () => {
        console.log("test")
        expect(await deleteSession(false)).toBe(401);
    });

     it("elemento no encontrado(404)", async () => {
        expect(await deleteSession()).toBe(404);
    });
}

export {deleteSession, testDeleteSession};