import { Pedido } from "../../models/pedido.js";

export const pedidoResolvers = {
  Query: {
    async pedidos(_, { page = 1, limit = 10 }) {
      // console.log("[Pedido] - ", page, limit);

      const pedidos = await Pedido.find().skip(limit * (page - 1)).limit(limit).populate(["usuario", "cliente"]);

      return pedidos;
    },

    async pedido(_, { id }) {
      // console.log("[Usuario ID] - ", id);

      const pedido = await Pedido.findById(id).populate(["usuario", "cliente"]);

      return pedido;
    }
  },
  Mutation: {
    async adicionarPedido(_, { pedidoInput: { ...pedido } }) {
      // console.log("[adicionarpedido] - ", pedido);

      const novoPedido = new Pedido({ ...pedido });

      return await novoPedido.save();
    }
  }
};