import { produtoTypeDefs } from "./produto/schemas/index.js";
import { usuarioTypeDefs } from "./usuario/schemas/index.js";
import { clienteTypeDefs } from "./cliente/schemas/index.js";
import { pedidoTypeDefs } from "./pedido/schemas/index.js";
import { enumsTypeDefs } from "./enums/index.js";

import { produtoResolvers } from "./produto/resolvers/index.js";
import { usuarioResolvers } from "./usuario/resolvers/index.js";
import { clienteResolvers } from "./cliente/resolvers/index.js";
import { pedidoResolvers } from "./pedido/resolvers/index.js";

import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";

export const typeDefs = mergeTypeDefs([enumsTypeDefs, produtoTypeDefs, usuarioTypeDefs, clienteTypeDefs, pedidoTypeDefs]);
export const resolvers = mergeResolvers([produtoResolvers, usuarioResolvers, clienteResolvers, pedidoResolvers]);
