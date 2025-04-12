import { Application } from "express";
import CheckIdMiddle from "./checkIdMiddle";

class Middleware {

    static addMiddleware(app:Application) {
        //CheckIdMiddle.addMiddleware(app);
    }
}

export default Middleware;