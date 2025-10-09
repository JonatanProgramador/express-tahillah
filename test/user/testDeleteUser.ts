import request from 'supertest';
import server from '../../src/server';
import { cookie, login } from './testLoginUser';
import { createUser } from './testCreateUser';
import { logout } from './testLogoutUser';


async function deleteUser(id: string, auth?: boolean) {
    const del = await request(server).delete('/deleteUser/' + id).set('cookie', auth ?? true ? cookie : '');
    return del.statusCode;
}

function testDeleteUser() {

    beforeAll(async () => {
        await login();
    });

    it("Eliminación del elemento exitoso(200)", async () => {
        const res = await createUser();
        expect(res.statusCode).toBe(201);
        expect(await deleteUser(res.body)).toBe(200);
    });

    it("Elemento no encontrado(404)", async () => {
        expect(await deleteUser('6815fa2c4at1af18b2f57a78')).toBe(404);
    });

    it("Error de autentificación(401)", async () => {
        expect(await deleteUser('asd', false)).toBe(401);
    });

    afterAll(async () => {
        await logout();
    });
}

export { deleteUser, testDeleteUser };