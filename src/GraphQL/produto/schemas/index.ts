export const produtoTypeDefs = `#graphql
  type Produto {
    _id: String
    codigo: String
    descricao: String
    preco: Float
    urlImg: String
    favorito: Boolean
    ativo: Boolean
  }

  input ProdutoInput {
    codigo: String
    descricao: String
    preco: Float
    urlImg: String
    favorito: Boolean
    ativo: Boolean
  }

  type Query {
    produtos(page: Int, limit: Int, ativo: Boolean, filtro: String): [Produto]
    produto(id: ID!): Produto!
  }

  type Mutation {
    criarProduto(produtoInput: ProdutoInput): Produto
    atualizaProduto(id: ID!, produtoInput: ProdutoInput): Produto
  }
`;