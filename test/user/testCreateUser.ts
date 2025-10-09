import request from 'supertest';
import server from '../../src/server';
import { cookie, login } from './testLoginUser';
import { logout } from './testLogoutUser';
import { searchUser } from './testSearchUser';
import { deleteUser } from './testDeleteUser';

const completeData = {
    name: "naruto",
    password: "1234",
    rol: "leader"
}

async function createUser(data?: object, auth?:boolean) {
    const result = await request(server).post('/register').send(data ?? completeData).set('cookie', auth??true?cookie:"");
    return { statusCode: result.statusCode, body: result.body }

}

function testCreateUser() {

    beforeAll(async () => {
        await login();
    });

    it("Creación exitosa(201)", async () => {
        const result = await createUser();
        expect(result.statusCode).toBe(201);
        const user = await searchUser({key:"name", value:completeData.name, precise:true});
        expect(user.statusCode).toBe(200);
        expect(user.body.length).toBeGreaterThan(0);
        expect(user.body[0].name).toBe(completeData.name);
        const del = await deleteUser(user.body[0]._id);
        expect(del).toBe(200);
    });

    it("Creación exitosa con elementos de mas(201)", async () => {
        const result = await createUser({...completeData, cosa:"asd"});
        expect(result.statusCode).toBe(201);
        const user = await searchUser({key:"name", value:completeData.name, precise:true});
        expect(user.statusCode).toBe(200);
        expect(user.body.length).toBeGreaterThan(0);
        expect(user.body[0].name).toBe(completeData.name);
        const del = await deleteUser(user.body[0]._id);
        expect(del).toBe(200);
        expect(user.body[0]).not.toHaveProperty("cosa");
    });

    it("Error en los elemenos del body(400)", async () => {
        const result = await createUser({});
        expect(result.statusCode).toBe(400);
    });

     it("Error el elemento ya existe(409)", async () => {
        const result = await createUser();
        expect(result.statusCode).toBe(201);
        const copy = await createUser();
        expect(copy.statusCode).toBe(409);
        const user = await searchUser({key:"name", value:completeData.name, precise:true});
        expect(user.statusCode).toBe(200);
        expect(user.body.length).toBeGreaterThan(0);
        expect(user.body[0].name).toBe(completeData.name);
        const del = await deleteUser(user.body[0]._id);
        expect(del).toBe(200);
        expect(user.body[0]).not.toHaveProperty("cosa");
    });

    afterAll(async () => {
        await logout();
    });

      it("Error de autentificación(401)", async () => {
        const result = await createUser(undefined, false);
        expect(result.statusCode).toBe(401);
    });
}

export {createUser, testCreateUser};