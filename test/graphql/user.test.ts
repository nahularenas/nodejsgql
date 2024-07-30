import { expect } from '@jest/globals'
import { test } from '@jest/globals'
import { schema } from '../../src/graphql/schema'
import { graphql } from 'graphql'

const rootValue = {}
const context = {}

const createUser = `mutation CreateUser($email: String!, $firstName: String!, $lastName: String!, $gender: String!) {
  createUser(email: $email, firstName: $firstName, lastName: $lastName, gender: $gender) {
    firstName
  }
}`

describe('User Queries', () => {
  test('should return all users', async () => {
    const variables = {
      email: 'test@test.com',
      firstName: 'Nahuel',
      lastName: 'Larenas',
      gender: 'male',
    }

    //create user
    await graphql(schema, createUser, rootValue, context, variables)

    const query = `
      query GetUsers {
        getUsers {
          email
          firstName
          lastName
          gender
        }
      }
    `

    const result = await graphql(schema, query, rootValue, context)

    // expect(result.data?.getUsers.length).toEqual(1)
    expect(result.data?.getUsers[0].firstName).toBe('Nahuel')
    expect(result.data?.getUsers[0].lastName).toBe('Larenas')
    expect(result.data?.getUsers[0].email).toBe('test@test.com')
    expect(result.data?.getUsers[0].gender).toBe('male')
  })

  test('should paginate users', async () => {
    const variables = {
      email: 'test2@test.com',
      firstName: 'Nahuel2',
      lastName: 'Larenas',
      gender: 'male',
    }

    //create other user
    await graphql(schema, createUser, rootValue, context, variables)

    const paginatedQuery = `
      query RootQueryType($pageSize: Int, $nextPageCursor: Int) {
        getUsers(pageSize: $pageSize, nextPageCursor: $nextPageCursor) {
          id
          email
          firstName
          lastName
          gender
        }
      }
    `

    const paginationVariables = {
      pageSize: 1,
      nextPageCursor: 2,
    }

    const queryResult = await graphql(
      schema,
      paginatedQuery,
      rootValue,
      context,
      paginationVariables
    )

    console.log(JSON.stringify(queryResult))

    console.log(queryResult)
    console.log(queryResult.data?.getUsers)

    // expect(queryResult.data?.getUsers.length).toEqual(1)
    expect(queryResult.data?.getUsers[0].firstName).toBe('Nahuel2')
    expect(queryResult.data?.getUsers[0].lastName).toBe('Larenas')
    expect(queryResult.data?.getUsers[0].email).toBe('test2@test.com')
    expect(queryResult.data?.getUsers[0].gender).toBe('male')
  })
})
