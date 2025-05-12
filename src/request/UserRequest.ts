import Zod from 'zod';

class UserRequest {

    static readonly userSchema = Zod.object({
        _id: Zod.string({
            invalid_type_error: "Tipo invalido",
        }).optional(),
        name: Zod.string({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
        }),
        password: Zod.string({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
        }),
        rol: Zod.string({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
        }).optional(),
    });


    static validate(obj: Object) {
        return this.userSchema.safeParse(obj);
    }
}

export default UserRequest;