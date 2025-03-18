import Zod from 'zod';

class PraiseRequest {

    static readonly praiseSchema = Zod.object({
        title: Zod.string({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
          }),

          tone: Zod.string({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
          }),

          letter: Zod.string({
            invalid_type_error: "Tipo invalido",
            required_error: "Campo requerido"
          }),
    });

    static validate(obj:Object) {
        return this.praiseSchema.safeParse(obj);
    }

    static validatePartial(obj:Object) {
      return this.praiseSchema.partial().safeParse(obj);
    }
}

export default PraiseRequest;