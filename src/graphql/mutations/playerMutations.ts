import { GraphQLString } from 'graphql'
import { PlayerType } from '../types/playerType'
import { resolveCreatePlayer } from '../../resolvers/playerResolver'

export const playerMutations = {
  createPlayer: {
    type: PlayerType,
    args: {
      name: { type: GraphQLString },
      team: { type: GraphQLString },
    },
    resolve: resolveCreatePlayer,
  },
}
