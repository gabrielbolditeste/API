
export const pedidoTypeDefs = `#graphql
scalar DateTime
  type ProdutoPedido {
    codigo: String
    descricao: String
    preco: Float
    quantidade: Int
    produto: Produto
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
  }

  input PedidoInput {
    produtos: [ProdutoPedidoInput]!
    descontos: [Float]!
    total: Float!
    condicaoPagamento: String
    data: DateTime
    cliente: String!
    usuario: String!
  }

  type Query {
    pedidos(page: Int, limit: Int): [Pedido]
    pedido(id: ID!): Pedido!
  }

  type Mutation {
    adicionarPedido(pedidoInput: PedidoInput): Pedido
  }
`;