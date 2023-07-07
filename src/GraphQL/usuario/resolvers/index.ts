import { Usuario } from "../../../DataBase/models/usuario.js";

export const usuarioResolvers = {
  Query: {
    async usuarios(_, { page = 1, limit = 10 }) {
      // console.log("[usuario] - ", page, limit);
      if(limit > 50) limit = 50;

      const usuarios = await Usuario.find().skip(limit * (page - 1)).limit(limit);

      return usuarios;
    },

    async usuario(_, { id }) {
      // console.log("[Usuario ID] - ", id);

      const usuario = await Usuario.findById(id);

      return usuario;
    }
  },
  Mutation: {
    async adicionarUsuario(_, { usuarioInput: { ...usuario } }) {
      // console.log("[adicionarUsuario] - ", usuario);
      
      const novoUsuario = new Usuario({ ...usuario });

      const resposta = await novoUsuario.save();

      return resposta;
    }
  }
};