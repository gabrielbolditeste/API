import { Cliente } from "../../models/cliente.js";
import { Usuario } from "../../models/usuario.js";

export const clienteResolvers = {
  Query: {
    async clientes(_, { page = 1, limit = 10 }) {
      console.log("[clientes] - ", page, limit);

      const clientes = await Cliente.find().skip(limit * (page - 1)).limit(limit);

      return clientes;
    },
    async cliente(_, { id }) {
      console.log("[cliente ID] - ", id);

      const cliente = await Cliente.findById(id).populate("usuario");
      console.log("[Cliente] - ", cliente);

      return cliente;
    },
  },

  Mutation: {
    async adicionarCliente(_, { clienteInput: { ...cliente } }) {
      console.log("[adicionarcliente] - ", cliente);
      const novoCliente = new Cliente({ ...cliente });

      const resposta = await novoCliente.save();

      return resposta;
    }
  }
};