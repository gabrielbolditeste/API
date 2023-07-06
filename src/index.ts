import { produtoTypeDefs } from "./produto/schemas/index.js";
import { usuarioTypeDefs } from "./usuario/schemas/index.js";
import { clienteTypeDefs } from "./cliente/schemas/index.js";

import { produtoResolvers } from "./produto/resolvers/index.js";
import { usuarioResolvers } from "./usuario/resolvers/index.js";
import { clienteResolvers } from "./cliente/resolvers/index.js";


import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";

const typeDefs = mergeTypeDefs([produtoTypeDefs, usuarioTypeDefs, clienteTypeDefs]);
const resolvers = mergeResolvers([produtoResolvers, usuarioResolvers, clienteResolvers]);

const MONGODB = "mongodb+srv://root:root@cluster0.kh8rbcy.mongodb.net/KMBv2?retryWrites=true&w=majority";

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = Number.parseInt(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.clear();
console.log(`🚀 Server listening at: ${url}`);