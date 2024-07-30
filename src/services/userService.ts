import { group } from 'console'
import prisma from '../../src/db'

export const createUser = (user: {
  email: string
  firstName: string
  lastName: string
  gender: string
  imageUrl?: string
}) => {
  return prisma.user.create({ data: user })
}

export const createGroup = (args: {
  name: string
  description: string
  userId: number
}) => {
  const { name, description, userId } = args

  return prisma.group.create({
    data: {
      name,
      description,
      users: {
        connect: { id: userId },
      },
    },
    include: { users: true },
  })
}

export const getUsers = (args: {
  pageSize?: number
  nextPageCursor?: number
}) => {
  const pageSize = args.pageSize ? args.pageSize : 10
  const nextPageCursor = args.nextPageCursor

  let queryArgs: any

  console.log('pageSize', pageSize)
  console.log('nextPageCursor', nextPageCursor)

  if (nextPageCursor) {
    queryArgs = {
      cursor: {
        id: nextPageCursor as number,
      },
      include: {
        groups: true,
      },
      take: pageSize,
      skip: 0,
    }
  } else {
    queryArgs = {
      include: {
        groups: true,
      },
      take: pageSize,
    }
  }

  return prisma.user.findMany(queryArgs)
}
