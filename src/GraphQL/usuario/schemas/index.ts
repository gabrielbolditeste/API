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
    permicao: String
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
    uf: String
    telefone: String
    email: String!
    observacoes: String
    ativo: Boolean
    jwt: String
    senha: String!
    permicao: String!
    dataCadastro: DateTime
  }

  input LoginInput {
    email: String!
    senha: String!
  }

  input NovaSenhaInput {
    email: String!
    senha: String!
    novaSenha: String!
  }

  type Query {
    usuarios(page: Int, limit: Int): [Usuario]
    usuario(id: ID!): Usuario!
  }

  type Mutation {
    adicionarUsuario(usuarioInput: UsuarioInput): Usuario
    atualizaUsuario(id: ID!, usuarioInput: UsuarioInput): Usuario
    loginUsuario(loginInput: LoginInput): Usuario
    atualizaSenha(novaSenhaInput: NovaSenhaInput): String
  }
`;