import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

export const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    team: { type: GraphQLString },
  },
})
