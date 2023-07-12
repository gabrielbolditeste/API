
import { GraphQLError } from "graphql";

class ErroBase extends Error {
  constructor(message = "Erro interno do servidor") {
    super();
    this.message = message;
  }

  enviarResposta() {
    console.log(this.message);
    throw new GraphQLError(`${this.message}`, {
      extensions: {
        code: "ERRO...",
      },
    });
  }
}

export default ErroBase;