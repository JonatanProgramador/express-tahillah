import UserInterface from "../interfaces/UserInterface";


interface UserInterfaceResourcer {
    _id: string
    name: string,
    rol: string
};

class UserResourcer {

    static format(user: UserInterface) {
        return user as UserInterfaceResourcer;
    }

}

export default UserResourcer;