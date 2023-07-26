
import { GraphQLError } from "graphql";

class ErroBase extends Error {
  static enviarResposta(message: string) {
    console.log(message);
    throw new GraphQLError(`${message}`, {
      extensions: {
        code: "ERRO...",
      },
    });
  }
}

export default ErroBase;