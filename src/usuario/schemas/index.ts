export const usuarioTypeDefs = `#graphql
scalar DateTime
  type Usuario {
    _id: String
    categoria: String
    nome: String
    documento: String
    tipoContribuinte: String
    inscricaoEstadual: String
    razaoSocial: String
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    cidade: String
    uf: String
    telefone: String
    email: String
    ativo: Boolean
    observacao: String
    jwt: String
    senha: String
    permicao: String
    dataCadastro: DateTime
  }

  input UsuarioInput {
    categoria: String!
    nome: String!
    documento: String!
    tipoContribuinte: String!
    inscricaoEstadual: String
    razaoSocial: String!
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    cidade: String
    uf: String
    telefone: String
    email: String!
    ativo: Boolean
    observacao: String
    jwt: String
    senha: String!
    permicao: String!
    dataCadastro: DateTime
  }

  type Query {
    usuarios(page: Int, limit: Int): [Usuario]
    usuario(id: ID!): Usuario!
  }

  type Mutation {
    adicionarUsuario(usuarioInput: UsuarioInput): Usuario
  }
`;