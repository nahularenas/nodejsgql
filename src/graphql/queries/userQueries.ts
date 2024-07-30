import { GraphQLInt, GraphQLList } from 'graphql'
import { UserType } from '../types/userType'
import { resolveGetUsers } from '../../resolvers/userResolver'

export const userQueries = {
  getUsers: {
    type: new GraphQLList(UserType),
    args: {
      pageSize: { type: GraphQLInt },
      nextPageCursor: { type: GraphQLInt },
    },
    resolve: resolveGetUsers,
  },
}
