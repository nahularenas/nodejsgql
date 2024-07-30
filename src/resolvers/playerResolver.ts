import {
  getPlayers,
  getPlayerById,
  createPlayer,
} from '../services/playerService'

export const resolveGetPlayers = (parent: any, args: any) => {
  return getPlayers()
}

export const resolveGetPlayerById = (parent: any, args: any) => {
  return getPlayerById(args.id)
}

export const resolveCreatePlayer = (parent: any, args: any) => {
  return createPlayer(args)
}
