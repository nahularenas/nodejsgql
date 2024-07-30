import { PlayerType } from '../types/playerType'
import {
  resolveGetPlayers,
  resolveGetPlayerById,
} from '../../resolvers/playerResolver'
import { GraphQLInt, GraphQLList } from 'graphql'

export const playerQueries = {
  getPlayers: {
    type: new GraphQLList(PlayerType),
    resolve: resolveGetPlayers,
  },
  getPlayerById: {
    type: PlayerType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve: resolveGetPlayerById,
  },
}
