
export const pedidoTypeDefs = `#graphql
scalar DateTime
  type ProdutoPedido {
    codigo: String!
    descricao: String!
    preco: Float!
    quantidade: Int!
    produto: Produto!
  }

  input ProdutoPedidoInput {
    codigo: String!
    descricao: String!
    preco: Float!
    quantidade: Int!
    produto: String!
  }

  type Pedido {
    _id: String
    produtos: [ProdutoPedido]
    descontos: [Float]
    total: Float
    condicaoPagamento: String
    data: DateTime
    cliente: Cliente
    usuario: Usuario
    transportador: String
    codigoDeBarras: String
    observacoes: String
    prazoDeEntrega: String
    telefone: String
    entregaOuColeta: String
    pedidoEspecial: String
  }

  input PedidoInput {
    produtos: [ProdutoPedidoInput]!
    descontos: [Float]
    total: Float!
    condicaoPagamento: String!
    data: DateTime
    cliente: String!
    usuario: String!
    transportador: String
    codigoDeBarras: String
    observacoes: String
    prazoDeEntrega: String
    telefone: String
    entregaOuColeta: String
    pedidoEspecial: String
  }

  type Pedidos {
    listaPedidos: [Pedido]
    quantidadePedidos: Int
  }

  type Query {
    pedidos(page: Int, limit: Int): Pedidos
    pedido(id: ID!): Pedido!
  }

  type Mutation {
    adicionarPedido(pedidoInput: PedidoInput): String
  }
`;