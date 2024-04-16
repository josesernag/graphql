import {IResolvers} from "@graphql-tools/utils";

export const gameResolver: IResolvers = {
    Query: {
        gameHello() {
            return "game world"
        }
    }
}