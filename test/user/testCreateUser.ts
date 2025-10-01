import request from 'supertest';
import server from '../../src/server';
import { cookie, login } from './testLoginUser';
import { logout } from './testLogoutUser';

const completeData = {
    name: "naruto",
    password: "1234",
    rol: "leader"
}

async function createUser(data?: string) {
    await request(server).get('/register').send(data ?? completeData).set('cookie', cookie);
}

function testCreateUser() {

    beforeAll(async () => {
        await login();
    });

    it("Creación exitosa(200)", async () => {

    });

    afterAll(async () => {
        await logout();
    });
}