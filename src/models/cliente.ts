import { Schema, model, Types } from "mongoose";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import isEmail from "validator/lib/isEmail.js";

interface ICliente {
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
      type: String 
    },
    documento: { 
      type: String, 
      unique: true 
    },
    inscricaoEstadual: { 
      type: String 
    },
    razaoSocial: { 
      type: String 
    },
    cep: { 
      type: String 
    },
    endereco: { 
      type: String 
    },
    numero: { 
      type: String 
    },
    complemento: { 
      type: String 
    },
    bairro: { 
      type: String 
    },
    municipio: { 
      type: String 
    },
    uf: { 
      type: String 
    },
    telefone: { 
      type: String 
    },
    email: {
      type: String,
      // validate: [isEmail, "{VALUE} não é um Email valido"]
      default: ""
    },
    observacoes: { 
      type: String 
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