import { Application } from "express";
import SecurityLevelsMiddle from "./SecurityLevelsMiddle";

class AddMiddleware {

    static add(app:Application) {
        new SecurityLevelsMiddle(app);
    }
}

export default AddMiddleware;