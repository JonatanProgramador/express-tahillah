import Zod from 'zod';

class PraiseRequest {

  static readonly letterSchema = Zod.object({
    id: Zod.number({
      invalid_type_error: "Tipo invalido",
      required_error: "Campo requerido"
    }),
    type: Zod.string({
      invalid_type_error: "Tipo invalido",
      required_error: "Campo requerido"
    }),
    summary: Zod.string({
      invalid_type_error: "Tipo invalido",
      required_error: "Campo requerido"
    }),

    letter: Zod.string({
      invalid_type_error: "Tipo invalido",
      required_error: "Campo requerido"
    }),
  })

  static readonly praiseSchema = Zod.object({
    title: Zod.string({
      invalid_type_error: "Tipo invalido",
      required_error: "Campo requerido"
    }),
    type: Zod.string({
      invalid_type_error: "Tipo invalido",
      required_error: "Campo requerido"
    }),
    tone: Zod.string({
      invalid_type_error: "Tipo invalido",
    }).optional(),
    author: Zod.string({
      invalid_type_error: "Tipo invalido",
    }).optional(),
    track: Zod.string({
      invalid_type_error: "Tipo invalido",
    }).optional(),

    letters: Zod.array(this.letterSchema),
  });

  static validate(obj: Object) {
    return this.praiseSchema.safeParse(obj);
  }

  static validatePartial(obj: Object) {
    return this.praiseSchema.partial().safeParse(obj);
  }
}

export default PraiseRequest;