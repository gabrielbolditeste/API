import mongoose, { Schema, Types, model } from "mongoose";

interface IPedido {
  id: string;
  produtos: [
    {
      codigo: string,
      descricao: string,
      preco: number,
      produto: Types.ObjectId
    }
  ];
  descontos: Array<number>;
  total: number;
  data: Date;
  cliente: Types.ObjectId;
  usuario: Types.ObjectId;
}

const PedidoModel = new Schema<IPedido>({
  id: {
    type: String
  },
  produtos: [{
    codigo: {
      type: String,
      required: [true, "O Código é obrigatório"]
    },
    descricao: {
      type: String,
      required: [true, "A Descrição é obrigatória"]
    },
    preco: {
      type: Number,
      required: [true, "Preço é obrigatório"],
      min: [0.01, "O Preço minimo é R$ 0.01. Valor fornecido {VALUE}"],
    },
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      // required: [true, "O ID do produto é obrigatório"],
      ref: "produtos",
      autopopulate: true
    }
  }],
  descontos: {
    type: [Schema.Types.Number],
    default: [0, 0, 0]
  },
  total: {
    type: Number,
    required: [true, "O Valor Total da compra é obrigatório"]
  },
  data: {
    type: Date,
    default: Date.now
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    // required: [true, "O ID do cliente é obrigatório"],
    ref: "clientes",
    autopopulate: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    // required: [true, "O ID do usuario é obrigatório"],
    ref: "usuarios",
    autopopulate: true
  }
});

export const Pedido = model<IPedido>("pedidos", PedidoModel);