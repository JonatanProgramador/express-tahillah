import { Application } from "express";
import CheckIdMiddle from "./CheckIdMiddle";
import ProtectedMiddle from "./ProtectedMiddle";
import RolMiddle from "./RolMiddle";

class AddMiddleware {

    static add(app:Application) {
        //new CheckIdMiddle(app);
        new ProtectedMiddle(app);
        new RolMiddle(app);
    }
}

export default AddMiddleware;