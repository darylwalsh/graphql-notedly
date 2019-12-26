/* Helper file for seeding user data during testing or local development */

import models from '../../models'
import seedUsers from './users'
import seedNotes from './notes'
const db = require('../../db')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
//const DB_HOST =
console.log(DB_HOST)
const seed = async () => {
  console.log('Seeding data...')
  db.connect(DB_HOST)
  //const users = await models.User.create(await seedUsers())
  const users = await models.User.distinct('_id')
  console.log(users)
  const usersArray = users.map(x => x.toString())
  console.log('Array of ids:')
  console.log(usersArray)

  //const seedRun = await seedNotes(users)
  // @ts-ignore
  await models.Note.create(await seedNotes(users))
  console.log('Data successfully seeded')
  process.exit(0)
}

seed()

export default seed
