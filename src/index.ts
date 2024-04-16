import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './graphql'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const app = express() as any;
app.use(cors())

const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    introspection: true
})

server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port: 3000 }, () =>
        console.log("http://localhost:3000")
    )
})