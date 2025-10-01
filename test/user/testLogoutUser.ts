import request from 'supertest';
import server from '../../src/server';
import { cookie, login, setCookie } from './testLoginUser';

async function logout() {
    const re = await request(server).get('/logout').set('cookie', cookie);
    if(re.statusCode===200)setCookie('');
    return {statusCode:re.statusCode, token:re.headers['set-cookie']?re.headers['set-cookie'][0].split(";")[0]:undefined};
}

function testLogoutUser() {
     it("Logout correcto(200)", async ()=>{
            await login();
            const re = await logout();
            expect(re.statusCode).toBe(200);
            expect(re.token).toBe('token=');
        });

         it("Error de autentificación(401)", async ()=>{
            const re = await logout();
            expect(re.statusCode).toBe(401);
            expect(re.token).toBe(undefined);
        });
}

export {logout, testLogoutUser};