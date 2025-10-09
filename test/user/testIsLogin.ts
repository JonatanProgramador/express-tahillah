import request from 'supertest';
import server from '../../src/server';
import { cookie, login } from './testLoginUser';
import { logout } from './testLogoutUser';
import { createUser } from './testCreateUser';
import { deleteUser } from './testDeleteUser';

const completeData = {
    name: "naruto",
    password: "1234",
    rol: ""
}


async function isLogin(auth?: boolean, level?: number) {
 
    switch (level) {
        case 2:
            completeData.rol = "leader";
            break;
        case 3:
            completeData.rol = "admin";
            break;
        default:
            completeData.rol = "user";
            break;
    };

    expect(await login()).toBe(200);
    const newUser = await createUser(completeData);
    expect(newUser.statusCode).toBe(201);;
    expect((await logout()).statusCode).toBe(200);

    expect(await login(completeData.name, completeData.password)).toBe(200);
    const result = await request(server).get('/isLogin').set('cookie', auth ?? true ? cookie : '');
    expect((await logout()).statusCode).toBe(200);
    
    expect(await login()).toBe(200);
    expect(await deleteUser(newUser.body)).toBe(200);
    expect((await logout()).statusCode).toBe(200);

    return { statusCode: result.statusCode, body: result.text };
}



function testIsLogin() {

    it("Login nivel 3", async () => {
        const result = await isLogin(undefined, 3);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe("3");
    });

    it("Login nivel 2", async () => {
         const result = await isLogin(undefined, 2);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe("2");
    });

     it("Login nivel 1", async () => {
         const result = await isLogin(undefined, 1);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe("1");
    });

    it("Login nivel 0", async () => {
        const result = await isLogin(false, 3);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe("0");
    });
}

export { testIsLogin };