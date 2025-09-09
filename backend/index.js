import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { gameRoutes } from './routes/gameRoutes.js'
import { generationRoutes } from './routes/generationRoutes.js'
import { typeRoutes } from './routes/typeRoutes.js'
import { pokemonRoutes } from './routes/pokemonRoutes.js'
import { moveRoutes } from './routes/moveRoutes.js'
import { eggGroupRoutes } from './routes/eggGroupRoutes.js'
import { abilityRoutes } from './routes/abilityRoutes.js'
import { pokemonGameRoutes } from './routes/pokemonGameRoutes.js'
import { locationRoutes } from './routes/locationRoutes.js'

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.use('/game', gameRoutes)
app.use('/generation', generationRoutes)
app.use('/type', typeRoutes)
app.use('/pokemon', pokemonRoutes)
app.use('/move', moveRoutes)
app.use('/egg-group', eggGroupRoutes)
app.use('/ability', abilityRoutes)
app.use('/location', locationRoutes)
app.use('/pokemongame', pokemonGameRoutes)

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`))