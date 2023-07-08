export const usuarioTypeDefs = `#graphql
  scalar DateTime
  
  type Usuario {
    _id: String
    nome: String
    documento: String
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
    ativo: Boolean
    jwt: String
    senha: String
    permicao: Permicao
    dataCadastro: DateTime
  }

  input UsuarioInput {
    nome: String!
    documento: String!
    razaoSocial: String!
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    municipio: String
    uf: Estado
    telefone: String
    email: String!
    observacoes: String
    ativo: Boolean
    jwt: String
    senha: String!
    permicao: Permicao!
    dataCadastro: DateTime
  }

  type Query {
    usuarios(page: Int, limit: Int, ativo: Boolean, filtro: String): [Usuario]
    usuario(id: ID!): Usuario!
  }

  type Mutation {
    adicionarUsuario(usuarioInput: UsuarioInput): Usuario
    atualizaUsuario(id: ID!, usuarioInput: UsuarioInput): Usuario
  }
`;