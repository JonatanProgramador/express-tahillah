import request from 'supertest';
import server from '../../src/server';
import { cookie, login } from './testLoginUser';
import { logout } from './testLogoutUser';




async function getAllUsers(auth?:boolean) {
    const result = await request(server).get('/users').set("cookie", auth??true?cookie:"");
    return { statusCode: result.statusCode, body: result.body }
}


function testGetAllUsers() {
    it("Consulta exitosa(200)", async () => {
        await login();
        const res = await getAllUsers();
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        await logout();
    });

    it("Error de autentificación(400)", async () => {
        const res = await getAllUsers(false);
        expect(res.statusCode).toBe(401);
        expect(Object.keys(res.body).length).toBe(0);
    });
}

export {testGetAllUsers};