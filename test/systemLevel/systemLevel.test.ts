
import MongoDB from '../../src/libs/MongoDB';
import Routers from '../../src/routes/Routers';
import { login } from "../user/testLoginUser";
import { logout } from "../user/testLogoutUser";
import { createUser } from '../user/testCreateUser';
import { deleteUser } from '../user/testDeleteUser';
import { searchUser } from '../user/testSearchUser';
import levelCheckUser from './levelCheckUser';




beforeAll(async () => {
    await MongoDB.connectDB();
    expect((await login())).toBe(200);
    expect((await createUser({ name: "usuario", password: "1234", rol: "user" })).statusCode).toBe(201);
    expect((await createUser({ name: "lider", password: "1234", rol: "leader" })).statusCode).toBe(201);
    expect((await logout()).statusCode).toBe(200);
})

describe("Pruabas del sistema de niveles. Numero de rutas: " + Routers.length, () => {

    describe("Nivel 0 (invitado)", levelCheckUser(0));

    describe("Nivel 1 (usuario)", levelCheckUser(1));

    describe("Nivel 2 (lider)", levelCheckUser(2));

    describe("Nivel 3 (admin)", levelCheckUser(3));

});

afterAll(async () => {
    expect((await login())).toBe(200);

    const userResult = await searchUser({ key: "name", value: "usuario", precise: true });
    const leaderResult = await searchUser({ key: "name", value: "lider", precise: true });

    expect(userResult.statusCode).toBe(200);
    expect(userResult.body.length).toBeGreaterThan(0);
    expect(userResult.body[0]).toHaveProperty("_id");

    expect(leaderResult.statusCode).toBe(200);
    expect(leaderResult.body.length).toBeGreaterThan(0);
    expect(leaderResult.body[0]).toHaveProperty("_id");

    expect((await deleteUser(userResult.body[0]._id))).toBe(200);
    expect((await deleteUser(leaderResult.body[0]._id))).toBe(200);

    expect((await logout()).statusCode).toBe(200);

    await MongoDB.desconnectDB();
});