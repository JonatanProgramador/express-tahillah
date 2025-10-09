import MongoDB from "../../src/libs/MongoDB";
import { testCreateUser } from "./testCreateUser";
import { testDeleteUser } from "./testDeleteUser";
import { testGetAllUsers } from "./testGetAllUsers";
import { testIsLogin } from "./testIsLogin";
import { testLoginUser } from "./testLoginUser";
import { testLogoutUser } from "./testLogoutUser";
import { testSearchUser } from "./testSearchUser";


beforeAll(async () => {
    await MongoDB.connectDB();
})

afterAll(async () => {
    await MongoDB.desconnectDB();
});

describe("Endpoint de user", () => {

    describe("Login", testLoginUser);

    describe("Logout", testLogoutUser);

    describe("Gel All Users", testGetAllUsers);

    describe("Search User", testSearchUser);

    describe("Delete User", testDeleteUser);

    describe("Create User", testCreateUser);
    
    describe("Islogin", testIsLogin);
});