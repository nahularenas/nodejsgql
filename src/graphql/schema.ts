import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { playerQueries } from './queries/playerQueries'
import { playerMutations } from './mutations/playerMutations'
import { userMutations } from './mutations/userMutations'
import { userQueries } from './queries/userQueries'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ...playerQueries,
    ...userQueries,
  }),
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    ...playerMutations,
    ...userMutations,
  }),
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
