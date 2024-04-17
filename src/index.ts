import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './graphql'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import MongoLib from "./mongo";
import config from "./config";

const app = express() as any;
app.use(cors())

const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    introspection: true,
    context: async () => new MongoLib().connect()
})

server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port: 3000 }, () =>
        console.log(`http://localhost:${config.port}/graphql`)
    )
})