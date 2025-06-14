import Zod from 'zod';

class SessionRequest {
     static readonly sessionSchema = Zod.object({
            idUser: Zod.string({
                invalid_type_error: "Tipo invalido",
                required_error: "Campo requerido"
            }),
            idPraise: Zod.string({
                invalid_type_error: "Tipo invalido",
                required_error: "Campo requerido"
            }),
        });
    
        static validate(obj: Object) {
            return this.sessionSchema.safeParse(obj);
        }
}

export default SessionRequest;