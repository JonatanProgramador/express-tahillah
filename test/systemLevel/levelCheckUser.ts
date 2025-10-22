import request from 'supertest';
import server from '../../src/server';
import { cookie, login } from "../user/testLoginUser";
import { logout } from "../user/testLogoutUser";
import Routers from '../../src/routes/Routers';

let indice = 0;

export default function levelCheckUser(level: number) {

    return () => {
        beforeAll(async () => {
            switch (level) {
                case 1:
                    expect((await login("usuario", "1234"))).toBe(200);
                    break;
                case 2:
                    expect((await login("lider", "1234"))).toBe(200);
                    break;
                case 3:
                    expect((await login())).toBe(200);
                    break;
            }
        });

        let filtRouters = Routers.filter((rou) => level >= rou.securityLevel);
        indice = 1;

        describe("Rutas con acceso: ", () => {
            filtRouters.forEach(route => {
                checkLevel(route, true);
                ++indice;
            });
        });

        filtRouters = Routers.filter((rou) => rou.securityLevel > level);

        describe("Rutas sin acceso: ", () => {
            filtRouters.forEach(route => {
                checkLevel(route, false);
                ++indice;
            });
        });

        afterAll(async () => {
            if (level > 0) {
                expect((await logout()).statusCode).toBe(200);
            }
        });
    }

}

function checkLevel(route: { url: string, method: string, securityLevel: number }, access: boolean) {
    return it(`${indice} Ruta: ${route.url} Nivel: ${route.securityLevel}`, async () => {
        const req = request(server);
        let result = { statusCode: 0 }
        switch (route.method) {
            case 'get':
                result = await req.get(route.url).set("Cookie", cookie);
                break;
            case 'post':
                result = await req.post(route.url).set("Cookie", cookie);
                break;
            case 'patch':
                result = await req.patch(route.url).set("Cookie", cookie);
                break;
            case 'delete':
                result = await req.delete(route.url).set("Cookie", cookie);
                break;
        }
        const level = (await request(server).get('/isLogin').set('cookie', cookie)).text;

        if (access) {
            expect(result.statusCode).not.toBe(401);
        } else {
            expect(result.statusCode).toBe(401);
        }

    });
}