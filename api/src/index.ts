/**
 * Required External Modules
 */
import * as dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import { ApolloServer } from 'apollo-server-express'
import models from './models'
const db = require('./db')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
/**
 * App Variables
 */
dotenv.config()
// console.log('dbhost', process.env.DB_HOST_MONGO)
const DB_HOST = process.env.DB_HOST_MONGO
const app = express()
let PORT: number = 4000
//const port = process.env.PORT || 4000

if (!process.env.PORT) {

  PORT = parseInt(process.env.PORT as string, 10)
}

// Connect to the database
db.connect(DB_HOST);
/**
 * Data
 */
interface Note {
  id: string
  content: string
  author: string
}

let notes: Note[] = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' },
]




// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers,  context: () => {
  // Add the db models to the context
  return { models }
  }
})

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });



/**
 *  App Configuration
 */
app.get('/', (req: Request, res: Response, next: NextFunction) => res.send('Hello World!!!'))

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}${server.graphqlPath}`)
})

/**
 * Webpack HMR Activation
 */
