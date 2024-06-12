import {IResolvers} from "@graphql-tools/utils";
import data from '../../data/data.json'
import {Db, ObjectId} from "mongodb";
import {CHARACTERS_COLLECTION, GAMES_COLLECTION} from '../../mongo/collections'

export const characterResolver: IResolvers = {
    Query: {
        hello() {
            return "world"
        },
        getCharacter(root: void, args: any) {
            const [found] = data.characters.filter(ch => ch._id === args._id)
            return found
        },
        async getCharacters(root: void, args: void, context: Db) {
            try {
                return await context.collection('characters').find().toArray()
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {
        async createCharacter(root: void, args: any, context: Db) {
            try {
                await context.collection(CHARACTERS_COLLECTION)
                    .insertOne(args.character)
                return 'Character added successfully'
            } catch (error) {
                console.log(error)
            }
        },
        async editCharacter(root: void, args: any, context: Db) {
            try {
                const exists = await context.collection(CHARACTERS_COLLECTION)
                    .findOne({ _id: new ObjectId(args._id) })

                if(exists){
                    await context.collection(CHARACTERS_COLLECTION)
                        .updateOne(
                            { _id: new ObjectId(args._id)},
                            { $set: args.character }
                        )

                        return 'Character Updated'
                }
            } catch (error) {
                console.log(error)
            }
        }
    },

    Character: {
        async games(parent: any, args: void, context: Db) {
            const gameList = parent.games.map(async (gameId: string) =>
                await context.collection(GAMES_COLLECTION)
                    .findOne({_id: new ObjectId(gameId)})
            )
            return gameList
        }
    }
}