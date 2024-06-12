import {IResolvers} from "@graphql-tools/utils";
import {Db, ObjectId} from "mongodb";
import {DEVELOPERS_COLLECTION, GAMES_COLLECTION} from '../../mongo/collections'

export const gameResolver: IResolvers = {
    Query: {
        gameHello() {
            return "game world"
        },
        async getGames(root: void, args: any, context: Db) {
            try {
                return await context.collection(GAMES_COLLECTION)
                    .find()
                    .toArray()
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {
        async createGame(root: void, args: any, context: Db) {
            try {
                await context.collection(GAMES_COLLECTION)
                    .insertOne(args.game)
                return `Game ${args.game.title} added successfully`
            } catch (error) {
                console.log(error)
            }
        }
    },

    Game: {
        async developers(parent: any, args: void, context: Db) {
            const devList = parent.developers.map(async (id: string) =>
                await context.collection(DEVELOPERS_COLLECTION)
                    .findOne({ _id: new ObjectId(id) })
            )

            return devList
        }
    }
}