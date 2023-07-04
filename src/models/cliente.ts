import { Schema, model } from "mongoose";

interface ICliente {
  id: string;
  nome: string;
  grupo: string;
  documento: string;
  tipoContribuinte: string;
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
  dataInicio: string;
  observacoes: string;
  representante: string;
  vendedor: string;
}

const ClienteModel = new Schema<ICliente>(
  {

  },
  {
    versionKey: false
  }
);

export const Cliente = model<ICliente>("clientes", ClienteModel);