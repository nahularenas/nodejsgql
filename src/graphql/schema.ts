import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { playerQueries } from './queries/playerQueries'
import { playerMutations } from './mutations/playerMutations'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ...playerQueries,
  }),
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    ...playerMutations,
  }),
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
