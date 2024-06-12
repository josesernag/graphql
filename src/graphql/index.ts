import { GraphQLSchema } from 'graphql'
import { mergeSchemas} from "@graphql-tools/schema";
import { mergeTypeDefs } from "@graphql-tools/merge";
import 'graphql-import-node'
import characterSchema from './schemas/character.graphql'
import {characterResolver} from "./resolvers/character";
import gameSchema from './schemas/game.graphql'
import {gameResolver} from "./resolvers/game";
import developerSchema from './schemas/developer.graphql'
import {developerResolver} from "./resolvers/developer";

export const schema: GraphQLSchema = mergeSchemas({
    typeDefs: mergeTypeDefs([
        characterSchema,
        gameSchema,
        developerSchema
    ]),
    resolvers: [
        characterResolver,
        gameResolver,
        developerResolver
    ]
})

