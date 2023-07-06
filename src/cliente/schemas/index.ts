
export const clienteTypeDefs = `#graphql
scalar DateTime

  type Cliente {
    _id: String
    nome: String
    documento: String
    inscricaoEstadual: String
    razaoSocial: String
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    municipio: String
    uf: String
    telefone: String
    email: String
    observacoes: String
    usuario: Usuario
  }

  input ClienteInput {
    nome: String
    documento: String
    inscricaoEstadual: String
    razaoSocial: String
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    municipio: String
    uf: String
    telefone: String
    email: String
    observacoes: String
    usuario: String
  }

  type Query {
    clientes(page: Int, limit: Int): [Cliente]
    cliente(id: ID!): Cliente!
  }

  type Mutation {
    adicionarCliente(clienteInput: ClienteInput): Cliente
  }
`;