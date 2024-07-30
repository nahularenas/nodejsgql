import { expect } from '@jest/globals'
import { test } from '@jest/globals'
import { schema } from '../../src/graphql/schema'
import { graphql } from 'graphql'

const rootValue = {}
const context = {}

describe('Player mutations', () => {
  test('creates a player', async () => {
    const query = `
    mutation CreatePlayer($name: String, $team: String) {
      createPlayer(name: $name, team: $team) {
        id
        name
        team
      }
    }
  `
    const variables = {
      name: 'Test Player',
      team: 'Test Team',
    }

    const result = await graphql(schema, query, rootValue, context, variables)

    expect(result.data?.createPlayer.name).toBe('Test Player')
    expect(result.data?.createPlayer.team).toBe('Test Team')
  })
})

describe('Player queries', () => {
  test('fetches all players', async () => {
    const query = `
    query GetPlayers {
      getPlayers {
        id
        name
        team
      }
    }
  `

    const result = await graphql(schema, query, rootValue, context)

    expect(result.data?.getPlayers[0].name).toBe('Test Player')
    expect(result.data?.getPlayers[0].team).toBe('Test Team')
  })

  test('fetches a player by id', async () => {
    const query = `
    query GetPlayerById($id: Int!) {
      getPlayerById(id: $id) {
        id
        name
        team
      }
    }
  `

    const variables = {
      id: 1,
    }

    const result = await graphql(schema, query, rootValue, context, variables)

    expect(result.data?.getPlayerById.name).toBe('Test Player')
    expect(result.data?.getPlayerById.team).toBe('Test Team')
  })
})
