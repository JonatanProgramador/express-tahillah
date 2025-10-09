import request from 'supertest';
import server from '../../src/server';
import { cookie, login } from './testLoginUser';
import { logout } from './testLogoutUser';


const completeData = {
    key: "name",
    value: "battu",
    precise: true
}

async function searchUser(data?: object, auth?:boolean) {
    const result = await request(server).post('/user/search').send(data ?? completeData).set('cookie', auth ?? true?cookie:"");
    return { statusCode: result.statusCode, body: result.body }
}

function testSearchUser() {
    beforeAll(async () => {
        await login();
    })

    it("Busqueda exitosa(200)", async () => {
        const result = await searchUser();
        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);
        expect(result.body[0].name).toBe(completeData.value);
    });

    it("Busqueda exitosa sin resultados(200)", async () => {
        const result = await searchUser({key: completeData.key, value:"asd", precise:completeData.precise});
        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBe(0);
    });

     it("Busqueda exitosa con parametros de mas(200)", async () => {
        const result = await searchUser({...completeData, cosa:"asd"});
        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);
        expect(result.body[0].name).toBe(completeData.value);
    });

     it("Error parametros incorectos(400)", async () => {
        const result = await searchUser({cosa:"asd"});
        expect(result.statusCode).toBe(400);
        expect(Object.keys(result.body).length).toBe(0);
    });

     it("Error de autentificación(401)", async () => {
        const result = await searchUser(undefined, false);
        expect(result.statusCode).toBe(401);
        expect(Object.keys(result.body).length).toBe(0);
    });

    afterAll(async () => {
        await logout();
    });

}

export { testSearchUser, searchUser };