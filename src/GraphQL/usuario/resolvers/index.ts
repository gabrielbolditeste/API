import { Usuario } from "../../../DataBase/models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

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

    async loginUsuario(_, { loginInput: { email, senha } }) {
      const usuario = await Usuario.findOne({ email });

      if (usuario && (await bcrypt.compare(senha, usuario.senha.toString()))) {
        const token = jwt.sign({ _id: usuario._id, email }, "ISSO_DEVERIA_SER_PRIVATE_KEY", { expiresIn: "2h" });

        usuario.jwt = token;
        return usuario;
      } else {
        throw new GraphQLError("E-mail ou Senha invalidos", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
    },

    async atualizaSenha(_, { novaSenhaInput: { email, senha, novaSenha } }) {
      console.log("[Email] - ", email);
      console.log("[Senha] - ", senha);
      console.log("[NovaSenha] - ", novaSenha);


      const usuario = await Usuario.findOne({ email });
      console.log("[Usuario] - ", usuario);

      if (usuario && (await bcrypt.compare(senha, usuario.senha.toString()))) {
        const token = jwt.sign({ _id: usuario._id, email }, "ISSO_DEVERIA_SER_PRIVATE_KEY", { expiresIn: "2h" });

        usuario.jwt = token;
        usuario.senha = await bcrypt.hash(novaSenha, 10);
      } else {
        throw new GraphQLError("Senha Atual incorreta", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      await usuario.save();
      return "Nova senha Salva";
    },

    async atualizaUsuario(_, { id, usuarioInput }) {
      const usuarioAtualizado = await Usuario.findByIdAndUpdate({ _id: id }, { ...usuarioInput }, { new: true });
      return usuarioAtualizado;
    }
  }
};