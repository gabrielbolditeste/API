import { Pedido } from "../../../DataBase/models/pedido.js";

export const pedidoResolvers = {
  Query: {
    async pedidos(_, { page = 1, limit = 10 }) {
      if(limit > 50) limit = 50;
      
      const pedidos = await Pedido.find().skip(limit * (page - 1)).limit(limit).populate([
        { path: "usuario" }, 
        { path: "cliente" }, 
        {
          path: "produtos", 
          populate: {
            path: "produto",
          }
        }]);

      return pedidos;
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

      return await novoPedido.save();
    }
  }
};