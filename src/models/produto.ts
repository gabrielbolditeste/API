import { Schema, model } from "mongoose";

interface IProduto {
  id: string;
  codigo: string;
  descricao: string;
  preco: number;
  urlImg: string;
  favorito: boolean;
  ativo: boolean;
}

const ProdutoModel = new Schema<IProduto>(
  {
    id: {
      type: String
    },
    codigo: {
      unique: true,
      type: String,
      required: [true, "O Código é obrigatório"]
    },
    descricao: {
      unique: true,
      type: String,
      required: [true, "A Descrição é obrigatória"]
    },
    preco: {
      type: Number,
      required: [true, "Preço é obrigatório"],
      min: [0.01, "O Preço minimo é R$ 0.01. Valor fornecido {VALUE}"],
    },
    urlImg: {
      type: String,
      default: ""
    },
    favorito: {
      type: Boolean,
      default: false,
    },
    ativo: {
      type: Boolean,
      default: true,
    }
  },
  {
    versionKey: false
  }
);

export const Produto = model<IProduto>("produtos", ProdutoModel);

// export default Produto;