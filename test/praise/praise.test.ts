
import MongoDB from '../../src/libs/MongoDB';
import testGetAllPraise from './testGetAllPraise';
import { testGetPraiseById } from './testGetPraiseById';
import { login } from '../user/testLoginUser';
import { testCreatePraise } from './testCreatePraise';
import { testDeletePraise } from './testDeletePraise';
import { testUpdatePraise } from './testUpdatePraise';
import { testSearchPraise } from './testSearchPraise';
import { logout } from '../user/testLogoutUser';


beforeAll(async () => {
    await MongoDB.connectDB();
    await login();
})

afterAll(async () => {
    await logout();
    await MongoDB.desconnectDB();
});

describe("Endpoint de praise", () => {

    describe("Get all praises", testGetAllPraise);

    describe("Get praise by id", testGetPraiseById);

    describe("Create praise", testCreatePraise);

    describe("Delete praise", testDeletePraise);

    describe("Update praise", testUpdatePraise);

    describe("Search praise", testSearchPraise);

});