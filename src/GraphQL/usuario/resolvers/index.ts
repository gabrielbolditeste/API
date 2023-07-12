import { IUsuarioModel, Usuario } from "../../../DataBase/models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const usuarioResolvers = {
  Query: {
    async usuarios(_, { page = 0, limit = 10, ativo = undefined, filtro = "" }) {
      if (limit > 50) limit = 50;

      const quantidadeUsuarios = await Usuario.count();
      let listaUsuarios: IUsuarioModel[];

      switch (ativo) {
      case undefined:
        listaUsuarios = await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * page).limit(limit).where({ permicao: "USER" });
        break;
      case true:
        listaUsuarios = await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * page).limit(limit).where({ ativo: ativo, permicao: "USER" });
        break;
      case false:
        listaUsuarios = await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * page).limit(limit).where({ ativo: ativo, permicao: "USER" });
        break;
      }

      return { listaUsuarios, quantidadeUsuarios };
    },

    async usuario(_, { id }) {
      const usuario = await Usuario.findById(id);
      return usuario;
    }
  },

  Mutation: {
    async adicionarUsuario(_, { usuarioInput: { ...usuario } }) {
      try {
        const oldUserEmail = await Usuario.findOne({ email: usuario.email });
        const oldUserCpf = await Usuario.findOne({ documento: usuario.documento });

        if (oldUserEmail || oldUserCpf) {
          erro("Documento ou E-mail já cadastrado.");
        }

        const senhaCryptografada = await bcrypt.hash(usuario.senha, 10);
        const novoUsuario = new Usuario({
          ...usuario,
          email: usuario.email.toLowerCase(),
          senha: senhaCryptografada,
        });

        return await novoUsuario.save();
      } catch (error) {
        erro("Documento ou E-mail já cadastrado.");
      }
    },

    async loginUsuario(_, { loginInput: { email, senha } }) {
      const usuario = await Usuario.findOne({ email: email.toLowerCase() });

      if (usuario && (await bcrypt.compare(senha, usuario.senha.toString()))) {
        usuario.jwt = jwt.sign({ _id: usuario._id, email }, "ISSO_DEVERIA_SER_PRIVATE_KEY", { expiresIn: "2h" });
        return usuario;
      } else {
        erro("E-mail ou Senha invalido.");
      }
    },

    async atualizaSenha(_, { novaSenhaInput: { email, senha, novaSenha } }) {
      try {
        const usuario = await Usuario.findOne({ email });

        if (usuario && (await bcrypt.compare(senha, usuario.senha.toString()))) {
          usuario.jwt = jwt.sign({ _id: usuario._id, email }, "ISSO_DEVERIA_SER_PRIVATE_KEY", { expiresIn: "2h" });
          usuario.senha = await bcrypt.hash(novaSenha, 10);
        } else {
          erro("Senha Atual incorreta");
        }

        await usuario.save();
        return "Nova senha Salva";
      } catch (error) {
        erro("Erro interno do sistema.");
      }
    },

    async atualizaUsuario(_, { id, usuarioInput }) {
      try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate({ _id: id }, { ...usuarioInput }, { new: true });
        return usuarioAtualizado;
      } catch (error) {
        if (error.code === 11000) {
          erro("Email já cadastrado no sistema");
        } else {
          erro("Erro interno do sistema.");
        }
      }
    }
  }
};

const erro = (msg: string) => {
  throw new GraphQLError(`${msg}`, {
    extensions: {
      code: "BAD_USER_INPUT",
    },
  });
};