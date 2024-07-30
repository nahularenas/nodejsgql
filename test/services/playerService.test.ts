import {
  createPlayer,
  getPlayers,
  getPlayerById,
} from '../../src/services/playerService'
import prisma from '../../src/db'
import sinon from 'sinon'

describe('playerService', () => {
  afterEach(() => {
    sinon.restore()
  })

  const mockPlayer = {
    id: 1,
    name: 'John Doe',
    team: 'Arsenal',
  }

  it('creates a new player', async () => {
    prisma.player.create = sinon.stub().resolves(mockPlayer)

    const player = await createPlayer(mockPlayer)
    expect(player).toEqual(mockPlayer)
  })

  it('gets all players', async () => {
    prisma.player.findMany = sinon.stub().resolves([mockPlayer])
    const players = await getPlayers()
    expect(players).toEqual([mockPlayer])
  })

  it('gets a player by ID', async () => {
    prisma.player.findUnique = sinon.stub().resolves(mockPlayer)
    const player = await getPlayerById(1)
    expect(player).toEqual(mockPlayer)
  })
})
