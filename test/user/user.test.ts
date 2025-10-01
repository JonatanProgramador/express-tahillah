import MongoDB from "../../src/libs/MongoDB";
import { testLoginUser } from "./testLoginUser";
import { testLogoutUser } from "./testLogoutUser";


beforeAll(async () => {
    await MongoDB.connectDB();
})

afterAll(async () => {
    await MongoDB.desconnectDB();
});

describe("Endpoint de user", () => {

    describe("Login", testLoginUser);

    describe("Logout", testLogoutUser);
});