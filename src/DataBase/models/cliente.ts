import { Schema, model, Types } from "mongoose";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import isEmail from "validator/lib/isEmail.js";

export interface ICliente {
  id: string;
  nome: string;
  documento: string;
  inscricaoEstadual: string;
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
  observacoes: string;
  usuario: Types.ObjectId;
}

const ClienteModel = new Schema<ICliente>(
  {
    id: {
      type: String
    },
    nome: {
      type: String,
      min: [3, "Nome deve ter no minimo 3 letras"]
    },
    documento: {
      type: String,
      unique: true, 
      default: "" 
    },
    inscricaoEstadual: {
      type: String, 
      default: "" 
    },
    razaoSocial: {
      type: String, 
      default: "" 
    },
    cep: {
      type: String, 
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
      required: [true, "UF é obrigatório"],
      enum: {
        values: [
          "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
          "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
          "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
        ],
        message: "{VALUE} não é um estado valido"
      }
    },
    telefone: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, "{VALUE} não é um Email valido"],
      default: ""
    },
    observacoes: {
      type: String, 
      default: "" 
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios",
      autopopulate: true
    }
  },
  {
    versionKey: false
  }
);

export const Cliente = model<ICliente>("clientes", ClienteModel);