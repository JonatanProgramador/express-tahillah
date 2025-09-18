import UserInterface from "../interfaces/UserInterface";


interface UserInterfaceResourcer {
    _id: string
    name: string,
    rol: string
};

class UserResourcer {

    static format(user: UserInterface[]) {
        const formatUsers:UserInterfaceResourcer[] = [];
        user.forEach(e => {
            formatUsers.push({_id:e._id, name:e.name, rol:e.rol});
        });
        return formatUsers;
    }

}

export default UserResourcer;