import { Produto } from "../../../DataBase/models/produto.js";

export const produtoResolvers = {
  Query: {
    async produtos(_, { page = 1, limit = 10 }) {
      // console.log("[produtos] - ", page, limit);
      if(limit > 50) limit = 50;

      const produtos = await Produto.find().skip(limit * (page - 1)).limit(limit);

      return produtos;
    },
    async produto(_, { id }) {
      // console.log("[produto ID] - ", id);

      const produto = await Produto.findById(id);

      return produto;
    },
  },

  Mutation: {
    async adicionarProduto(_, { produtoInput: { ...produto } }) {
      // console.log("[adicionarProduto] - ", produto);
      
      const novoProduto = new Produto({ ...produto });

      const resposta = await novoProduto.save();

      return resposta;
    }
  }
};