import Zod from 'zod';

class SearchRequest {

    static readonly userSchema = Zod.object({
        key: Zod.string({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
        }),
        value: Zod.string({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
        }),
        precise: Zod.boolean({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
        }),
    });

    static validate(obj: Object) {
        return this.userSchema.safeParse(obj);
    }

}

export default SearchRequest;