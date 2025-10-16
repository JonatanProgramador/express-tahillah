import MongoDB from "../../src/libs/MongoDB";
import { login } from "../user/testLoginUser";
import { logout } from "../user/testLogoutUser";
import { testCreateSession } from "./testCreateSession";


beforeAll(async () => {
    await MongoDB.connectDB();
    await login();
})

afterAll(async () => {
    await MongoDB.desconnectDB();
    await logout();
});

describe("Endpoint de user", () => {

    describe("Login", testCreateSession);

});