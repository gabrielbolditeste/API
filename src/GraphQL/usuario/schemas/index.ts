export const usuarioTypeDefs = `#graphql
  scalar DateTime

  enum Permicao {
    DEV
    ADM
    USER
  }

  enum Estado {
    AC
    AL
    AP
    AM
    BA
    CE
    DF
    ES
    GO
    MA
    MT
    MS
    MG
    PA
    PB
    PR
    PE
    PI
    RJ
    RN
    RS
    RO
    RR
    SC
    SP
    SE
    TO
  }

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
    usuarios(page: Int, limit: Int): [Usuario]
    usuario(id: ID!): Usuario!
  }

  type Mutation {
    adicionarUsuario(usuarioInput: UsuarioInput): Usuario
  }
`;