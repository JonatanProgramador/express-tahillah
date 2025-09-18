"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class UserResourcer {
    static format(user) {
        const formatUsers = [];
        user.forEach(e => {
            formatUsers.push({ _id: e._id, name: e.name, rol: e.rol });
        });
        return formatUsers;
    }
}
exports.default = UserResourcer;
