import {
  createGroup,
  createUser,
  getUsers,
} from '../../src/services/userService'

export const resolveCreateUser = async (_parent: unknown, args: any) => {
  return await createUser(args)
}

export const resolveCreateGroup = async (_parent: unknown, args: any) => {
  return await createGroup(args)
}

export const resolveGetUsers = async (_parent: unknown, args: any) => {
  const result = await getUsers(args)
  console.log(result)
  return result
}
