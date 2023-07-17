import { Pedido } from "../../../DataBase/models/pedido.js";

export const pedidoResolvers = {
  Query: {
    async pedidos(_, { page = 0, limit = 10 }) {
      if (limit > 100) limit = 100;
      const quantidadePedidos = await Pedido.count();

      const listaPedidos = await Pedido.find()
        .skip(limit * page)
        .limit(limit)
        .sort({ data: -1 })
        .populate([
          { path: "usuario" },
          { path: "cliente" },
          {
            path: "produtos",
            populate: {
              path: "produto",
            }
          }]);
      return { listaPedidos, quantidadePedidos };
    },

    async pedido(_, { id }) {
      const pedido = await Pedido.findById(id)
        .populate([
          { path: "usuario" },
          { path: "cliente" },
          {
            path: "produtos",
            populate: {
              path: "produto",
            }
          }]);
      return pedido;
    }
  },
  Mutation: {
    async adicionarPedido(_, { pedidoInput: { ...pedido } }) {

      const novoPedido = new Pedido({ ...pedido });

      const pedidoFeito =  await novoPedido.save();
      if(pedidoFeito) {
        return "Pedido cadastrado";
      } else {
        console.log("Error");
      }
    }
  }
};