/* Helper file for testing or local dev
/* Generates 25 fake notes */

import faker from 'faker'
import mongoose from 'mongoose'
import fetch from 'node-fetch'

const seedNotes = async (users: any) => {
  console.log('Seeding notes...')
  const notes = []

  // generate notes
  for (let i = 0; i < 25; i++) {
    // pick a random user from the array
    const randomInit = Math.floor(Math.random() * users.length)
    console.log('randomInit')
    console.log(randomInit)
    const random = users[Math.floor(Math.random() * users.length)]
    console.log('random')
    console.log(random)

    const newId = users[randomInit]._id
    console.log('newId')
    console.log(newId)
    let content

    // grab content from the lorem markdownum api
    const response = await fetch(
      'https://jaspervdj.be/lorem-markdownum/markdown.txt',
    )

    // if the response is ok, use the content else generate a fake ipsum paragraph
    if (response.ok) {
      content = await response.text()
    } else {
      content = faker.lorem.paragraph()
    }

    const note = {
      content,
      favoriteCount: 0,
      favoritedBy: [],
      author: mongoose.Types.ObjectId(random),
    }
    notes.push(note)
  }
  return notes
}

export default seedNotes
