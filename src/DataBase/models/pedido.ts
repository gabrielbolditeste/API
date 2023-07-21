import mongoose, { Schema, Types, model } from "mongoose";

interface IPedido {
  id: string;
  cliente: Types.ObjectId;
  usuario: Types.ObjectId;
  produtos: Array<IProduto>;
  // descontos: Array<number>; // remover desconto do pedido e aplicar os descontos por produto
  total: number;
  data: Date;

  condicaoPagamento: string;
  transportadora: string;
  codigoDeBarras: string;
  observacoes: string;
  prazoDeEntrega: string;
  telefone: string;
  entregaOuColeta: string;
  pedidoEspecial: string;
}

interface IProduto {
  codigo: string,
  descricao: string,
  preco: number,
  descontos: Array<number>;
  quantidade: number,
  produto: Types.ObjectId
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
      min: [0.001, "O Preço minimo é R$ 0.01. Valor fornecido {VALUE}"],
    },
    descontos: {
      type: [Schema.Types.Number],
      default: [0, 0, 0]
    },
    quantidade: {
      type: Number,
      required: [true, "A Quantidade é obrigatória"],
      min: [1, "Quantidade do produto não pode ser menor que 1. Valor fornecido {VALUE}"],
      integer: true
    },
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "O ID do produto é obrigatório"],
      ref: "produtos",
      autopopulate: true
    }
  }],
  total: {
    type: Number,
    required: [true, "O Valor Total da compra é obrigatório"]
  },
  condicaoPagamento: {
    type: String,
    default: ""
  },
  data: {
    type: Date,
    default: Date.now
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "O ID do cliente é obrigatório"],
    ref: "clientes",
    autopopulate: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "O ID do usuario é obrigatório"],
    ref: "usuarios",
    autopopulate: true
  },
  transportadora: {
    type: String,
    default: ""
  },
  codigoDeBarras: {
    type: String,
    default: ""
  },
  observacoes: {
    type: String,
    default: ""
  },
  prazoDeEntrega: {
    type: String,
    default: ""
  },
  telefone: {
    type: String,
    default: ""
  },
  entregaOuColeta: {
    type: String,
    default: ""
  },
  pedidoEspecial: {
    type: String,
    default: ""
  }
});

export const Pedido = model<IPedido>("pedidos", PedidoModel);