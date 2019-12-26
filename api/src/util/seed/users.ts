/* Helper file for testing or local dev
/* Generates 10 fake users */

import faker from 'faker'
import bcrypt from 'bcrypt'

const gravatar = require('../gravatar')

const seedUsers = async () => {
  console.log('Seeding users...')
  const users = []

  // generate 10 user profiles
  for (let i = 0; i < 10; i++) {
    const user = {
      username: faker.internet.userName(),
      password: await bcrypt.hash('password', 10),
      email: faker.internet.email(),
      avatar: '',
    }
    user.avatar = gravatar(user.email)
    users.push(user)
  }
  return users
}

export default seedUsers
