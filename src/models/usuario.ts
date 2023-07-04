
import isEmail from "validator/lib/isEmail.js";

import { Schema, model } from "mongoose";

interface IUsuario {
  id: string;
  categoria: string;
  nome: string;
  documento: string;
  tipoContribuinte: string;
  razaoSocial: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  telefone: string;
  email: string;
  dataInicio: Date;
  observacao: string;
  ativo: boolean;
  jwt: string;
  senha: string;
  permicao: string;
  dataCadastro: Date;
}

const UsuarioModel = new Schema<IUsuario>(
  {
    id: {
      type: String
    },
    categoria: {
      type: String,
      required: [true, "A Categoria é obrigatório"],
      enum: {
        values: ["Representante", "Vendedor"],
        message: "A Categoria {VALUE} não é valida"
      }
    },
    nome: {
      type: String,
      required: [true, "O Nome é obrigatório"],
      min: [3, "Mínimo de 3 caracteres"]
    },
    documento: {
      type: String,
      required: [true, "O Documento é obrigatório"],
      min: [11, "Mínimo de 11 caracteres"],
      max: [14, "Máximo de 14 caracteres"]
    },
    tipoContribuinte: {
      type: String,
      required: [true, "O Tipo de contribuinte é obrigatório"],
      enum: {
        values: ["Contribuinte", "Avaliar", "Não Contribuinte"],
        message: "O Tipo de contribuinte {VALUE} não é valido"
      }
    },
    razaoSocial: {
      type: String,
      required: [true, "A Razão Social é obrigatório"],
      min: [3, "Mínimo de 3 caracteres"]
    },
    cep: {
      type: String,
      max: [9, "Máximo de 9 caracteres"],
      default: ""
    },
    endereco: {
      type: String,
      default: ""
    },
    numero: {
      type: String,
      default: ""
    },
    complemento: {
      type: String,
      default: ""
    },
    bairro: {
      type: String,
      default: ""
    },
    municipio: {
      type: String,
      default: ""
    },
    uf: {
      type: String,
      default: ""
    },
    telefone: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      required: [true, "O Email é obrigatório"],
      validate: [isEmail, "{VALUE} não é um Email valido"]
    },
    dataInicio: {
      type: Date,
      default: Date.now
    },
    observacao: {
      type: String,
      default: ""
    },
    jwt: {
      type: String,
      default: ""
    },
    senha: {
      type: String,
      required: [true, "A Senha é obrigatória"],
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    permicao: {
      type: String,
      required: [true, "A Premição é obrigatória"],
      enum: {
        values: ["DEV", "ADM", "USER"],
        message: "A Premição {VALUE} não é valida"
      }
    },
    dataCadastro: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

export const Usuario = model<IUsuario>("usuarios", UsuarioModel);