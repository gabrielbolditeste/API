import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import { typeDefs, resolvers } from "./GraphQL/index.js";

// const MONGODB = "mongodb+srv://root:root@cluster0.kh8rbcy.mongodb.net/KMBv2?retryWrites=true&w=majority";
const MONGODB = "mongodb+srv://root:root@cluster0.kh8rbcy.mongodb.net/KMBv2TESTE?retryWrites=true&w=majority";

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const port = Number.parseInt(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.clear();
console.log(`🚀 Server listening at: ${url}`);