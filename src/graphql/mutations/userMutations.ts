import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql'
import { UserType } from '../types/userType'
import {
  resolveCreateUser,
  resolveCreateGroup,
} from '../../resolvers/userResolver'
import { GroupType } from '../types/groupType'

export const userMutations = {
  createUser: {
    type: UserType,
    args: {
      email: { type: GraphQLNonNull(GraphQLString) },
      firstName: { type: GraphQLNonNull(GraphQLString) },
      lastName: { type: GraphQLNonNull(GraphQLString) },
      gender: { type: GraphQLNonNull(GraphQLString) },
      imageUrl: { type: GraphQLString },
    },
    resolve: resolveCreateUser,
  },
  createGroup: {
    type: GroupType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLNonNull(GraphQLString) },
      userId: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: resolveCreateGroup,
  },
}
