import PraiseController from "../controllers/PraiseController";
import SessionController from "../controllers/SessionController";
import UserController from "../controllers/UserController";

const Routers = [

    //Rutas de alabanzas
    { url: '/praise', method: 'get', callBack: PraiseController.getAll, securityLevel: 0},
    { url: '/praise/:id', method: 'get', callBack: PraiseController.getById, securityLevel: 0 },
    { url: '/praise', method: 'post', callBack: PraiseController.create, securityLevel: 1 },
    { url: '/praise/:id', method: 'delete', callBack: PraiseController.delete, securityLevel: 1 },
    { url: '/praise/:id', method: 'patch', callBack: PraiseController.update, securityLevel: 1 },
    { url: '/praise/search', method: 'post', callBack: PraiseController.search, securityLevel: 0 },

    //Rutas de sesiones.
    { url: '/session', method: 'post', callBack: SessionController.create, securityLevel: 2},
    { url: '/session/searchByUser', method: 'get', callBack: SessionController.searchByUser, securityLevel: 2 },
    { url: '/session/:id', method: 'get', callBack: SessionController.getById, securityLevel: 0 },

    //Rutas de usuario
    { url: '/register', method: 'post', callBack: UserController.create, securityLevel: 3 },
    { url: '/login', method: 'get', callBack: UserController.login, securityLevel: 0},
    { url: '/islogin', method: 'get', callBack: UserController.isLogin, securityLevel: 0 },
    { url: '/logout', method: 'get', callBack: UserController.logout, securityLevel: 1 },
]


export default Routers;
