
interface Note {
  id: string
  content: string
  author: string
}

module.exports = {
    newNote: async (_: any, args: Note, {models}: any) => {
    return await models.Note.create({
      content: args.content,
      author: 'Adam Scott',
    })
    },
  }
