import prisma from '../db'
import { Player } from '@prisma/client'

/**
 * Create a new player
 * @param {Player} data
 * @returns {Promise<Player>}
 */
export async function createPlayer(data: Player): Promise<Player> {
  return prisma.player.create({ data })
}

/**
 * Get all players
 * @returns {Promise<Player[]>}
 */
export async function getPlayers(): Promise<Player[]> {
  return await prisma.player.findMany()
}

/**
 * Get a player by ID
 * @param {number} id
 * @returns {Promise<Player | null>}
 */
export async function getPlayerById(id: number): Promise<Player | null> {
  return await prisma.player.findUnique({ where: { id } })
}
