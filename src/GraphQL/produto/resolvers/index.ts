import { Produto } from "../../../DataBase/models/produto.js";

export const produtoResolvers = {
  Query: {
    async produtos(_, { page = 1, limit = 10, ativo = undefined, filtro = "" }) {
      if (limit > 50) limit = 50;

      switch (ativo) {
      case undefined:
        return await Produto.find({
          $or: [
            { codigo: { $regex: `${filtro}`, $options: "i" } },
            { descricao: { $regex: `${filtro}`, $options: "i" } }
          ]
        })
          .skip(limit * (page - 1))
          .limit(limit);
      case true:
        return await Produto.find({
          $or: [
            { codigo: { $regex: `${filtro}`, $options: "i" } },
            { descricao: { $regex: `${filtro}`, $options: "i" } }
          ]
        })
          .skip(limit * (page - 1))
          .limit(limit)
          .where({ ativo: ativo });
      case false:
        return await Produto.find({
          $or: [
            { codigo: { $regex: `${filtro}`, $options: "i" } },
            { descricao: { $regex: `${filtro}`, $options: "i" } }
          ]
        })
          .skip(limit * (page - 1))
          .limit(limit)
          .where({ ativo: ativo });
      }
    },

    async produto(_, { id }) {
      const produto = await Produto.findById(id);
      return produto;
    },
  },

  Mutation: {
    async criarProduto(_, { produtoInput: { ...produto } }) {
      const novoProduto = new Produto({ ...produto });
      const resposta = await novoProduto.save();
      return resposta;
    },

    async atualizaProduto(_, { id, produtoInput }) {
      const produtoAtualizado = await Produto.findByIdAndUpdate({ _id: id }, { ...produtoInput }, { new: true });
      return produtoAtualizado;
    },
  },
};