import { GameModel } from "../models/GameModel.js"

export class GameController {
    static async getGames(req, res) {
        const { games } = await GameModel.getGames()
        res.json(games)
    }

    static async getGamesByGen(req, res) {
        const { gen } = req.params
        const games = await GameModel.getGamesByGen({ gen })

        res.json(games)
    }

    static async getGamesForGen(req, res) {
        const { gamesByGen } = await GameModel.getGamesForGen()

        res.json(gamesByGen)
    }
}