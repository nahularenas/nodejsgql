import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import { UserType } from './userType'

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    users: { type: GraphQLList(UserType) },
  },
})
