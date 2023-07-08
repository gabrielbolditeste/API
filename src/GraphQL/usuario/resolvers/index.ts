import { Usuario } from "../../../DataBase/models/usuario.js";

export const usuarioResolvers = {
  Query: {
    async usuarios(_, { page = 1, limit = 10, ativo = undefined, filtro = "" }) {
      if (limit > 50) limit = 50;

      switch (ativo) {
      case undefined:
        return await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } },
            { razaoSocial: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * (page - 1)).limit(limit);
      case true:
        return await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } },
            { razaoSocial: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * (page - 1)).limit(limit).where({ ativo: ativo });
      case false:
        return await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } },
            { razaoSocial: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * (page - 1)).limit(limit).where({ ativo: ativo });
      }
    },

    async usuario(_, { id }) {
      const usuario = await Usuario.findById(id);
      return usuario;
    }
  },
  Mutation: {
    async adicionarUsuario(_, { usuarioInput: { ...usuario } }) {
      const novoUsuario = new Usuario({ ...usuario });
      const resposta = await novoUsuario.save();
      return resposta;
    },

    async atualizaUsuario(_, { id, usuarioInput }) {
      const usuarioAtualizado = await Usuario.findByIdAndUpdate({ _id: id }, { ...usuarioInput }, { new: true });
      return usuarioAtualizado;
    }
  }
};