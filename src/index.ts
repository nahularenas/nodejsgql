import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { createHandler } from 'graphql-http/lib/use/express'
import cors from 'cors'
import { schema } from './graphql/schema'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['POST'],
  })
)

app.all('/graphql', createHandler({ schema }))

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
