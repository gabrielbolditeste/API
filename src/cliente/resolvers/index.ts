import { Cliente } from "../../models/cliente.js";

export const clienteResolvers = {
  Query: {
    async clientes(_, { page = 1, limit = 10 }) {
      // console.log("[clientes] - ", page, limit);

      const clientes = await Cliente.find().skip(limit * (page - 1)).limit(limit).populate("usuario");

      return clientes;
    },
    async cliente(_, { id }) {
      // console.log("[cliente ID] - ", id);

      const cliente = await Cliente.findById(id).populate("usuario");
      // console.log("[Cliente] - ", cliente);

      return cliente;
    },
    async clientesPorUsuario(_, { id, page = 1, limit = 10 }) {
      const clientes = await Cliente.find({ usuario: id}).skip(limit * (page - 1)).limit(limit);

      return clientes;
    }
  },

  Mutation: {
    async adicionarCliente(_, { clienteInput: { ...cliente } }) {
      // console.log("[adicionarcliente] - ", cliente);

      const novoCliente = new Cliente({ ...cliente });

      const resposta = await novoCliente.save();

      return resposta;
    }
  }
};