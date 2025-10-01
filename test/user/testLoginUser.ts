import request from 'supertest';
import server from '../../src/server';
import { logout } from './testLogoutUser';

let cookie = "";

const user = "battu";
const pass = "1234";

function setCookie(coo:string) {cookie = coo};

async function login(us?:string, pas?:string) {
    if (cookie === "" || cookie === undefined) {
        us = us??user;
        pas = pas??pass;
        const credentials = Buffer.from(us + ":" + pas).toString('base64');
        const login = await request(server).get('/login').set('Authorization', 'Basic ' + credentials);
        cookie = login.headers['set-cookie'];
        return login.statusCode;
    }
}



function testLoginUser() {
    it("Login correcto(200)", async ()=>{
        const result = await login();
        expect(result).toBe(200);
        expect(cookie).not.toBe('');
        await logout();
    });

     it("Nombre y contraseña incorrectos(401)", async ()=>{
        const result = await login("asd","asd");
        if(result===200)await logout();
        expect(result).toBe(401);
        expect(cookie).toBe(undefined);
    });

     it("Nombre incorrecto(401)", async ()=>{
        const result = await login("asd", pass);
        if(result===200)await logout();
        expect(result).toBe(401);
        expect(cookie).toBe(undefined); 
    });

     it("Contraseña incorrecto(401)", async ()=>{
        const result = await login(user, "asd");
        if(result===200)await logout();
        expect(result).toBe(401);
        expect(cookie).toBe(undefined);
    });

    it("Sin la cabezera auth(400)", async ()=>{
        const result = await request(server).get('/login');
        if(result.statusCode===200)await logout();
        expect(result.statusCode).toBe(400);
        expect(cookie).toBe(undefined);
    });
}

export { login, setCookie, cookie, testLoginUser };