import MongoDB from "../../src/libs/MongoDB";
import { login } from "../user/testLoginUser";
import { logout } from "../user/testLogoutUser";
import { testCreateSession } from "./testCreateSession";
import { testDeleteSession } from "./testDeleteSession";
import { testGetSessionById } from "./testGetSessionById";
import { testSearchSessionByUser } from "./testSearchSessionByUser";


beforeAll(async () => {
    await MongoDB.connectDB();
    await login();
})

afterAll(async () => {
    await MongoDB.desconnectDB();
    await logout();
});

describe("Endpoint de user", () => {

    describe("Create Session", testCreateSession);

    describe("Delete Session", testDeleteSession);

    describe("Get Session By Id", testGetSessionById);

    describe("Search Session By User", testSearchSessionByUser);

});