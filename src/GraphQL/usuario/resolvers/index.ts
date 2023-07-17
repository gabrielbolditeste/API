import { IUsuarioModel, Usuario } from "../../../DataBase/models/usuario.js";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

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

        if (usuario.senha.length >= 6) {
          const senhaCryptografada = await bcrypt.hash(usuario.senha, 10);
          const novoUsuario = new Usuario({
            ...usuario,
            email: usuario.email.toLowerCase(),
            senha: senhaCryptografada,
            jwt: jwt.sign({
              nome: usuario.nome,
              email: usuario.email,
              permissao: usuario.permissao,
            }, "ISSO_DEVERIA_SER_PRIVATE_KEY")
          });
          return await novoUsuario.save();
        } else {
          erro("Senha deve ter mais de 6 caracteres");
        }
      } catch (error) {
        erro("Erro...");
      }
    },

    async loginUsuario(_, { loginInput: { email, senha } }) {
      try {
        const usuario = await Usuario.findOne({ email: email.toLowerCase() });

        if (usuario && (await bcrypt.compare(senha, usuario.senha.toString()))) {
          usuario.jwt = jwt.sign({
            nome: usuario.nome,
            email: usuario.email,
            permissao: usuario.permissao,
          },
          "ISSO_DEVERIA_SER_PRIVATE_KEY"
          );
          return usuario;
        } else {
          throw new GraphQLError("Erro ao efetuar login");
        }
      } catch (error) {
        throw new GraphQLError("Erro ao efetuar login");
      }
    },

    async atualizaSenha(_, { novaSenhaInput: { email, senha, novaSenha } }) {
      try {
        const usuario = await Usuario.findOne({ email });

        if (usuario === null) {
          erro("Email não encontrado");
        } else if (usuario && (await bcrypt.compare(senha, usuario.senha.toString()))) {
          usuario.jwt = jwt.sign({
            nome: usuario.nome,
            email: usuario.email,
            permissao: usuario.permissao,
          }, "ISSO_DEVERIA_SER_PRIVATE_KEY");
          usuario.senha = await bcrypt.hash(novaSenha, 10);
          await usuario.save();
          return "Nova senha Salva";
        } else {
          erro("Senha Atual incorreta");
        }
      } catch (error) {
        erro("Erro...");
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

const erro = (msg?: string) => {
  console.log("[ERROR] - ", msg);
};