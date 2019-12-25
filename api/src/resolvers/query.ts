module.exports = {
  notes: async (_: any, args: any, { models }: any) => {
    return await models.Note.find().limit(100)
  },
  note: async (_: any, args: { id: string }, { models }: any) => {
    return await models.Note.findById(args.id)
  },
  // add the following to the existing module.exports object:
  user: async (_: any, { username }: { username: string }, { models }: any) => {
    // find a user given their username
    return await models.User.findOne({ username })
  },
  users: async (_: any, args: any, { models }: any) => {
    // find all users
    return await models.User.find({})
  },
  me: async (_: any, args: any, { models, user }: any) => {
    // find a user given the current user context
    return await models.User.findById(user.id)
  },
  noteFeed: async (_: any, { cursor }: any, { models }: any) => {
    // hard code the limit to 10 items
    const limit = 10
    // set the default hasNextPage value to false
    let hasNextPage = false
    // if no cursor is passed the default query will be empty
    // this will pull the newest notes from the db
    let cursorQuery = {}

    // if there is a cursor
    // our query will look for notes with an ObjectId less than that of the cursor
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } }
    }

    // find the limit + 1 of notes in our db, sorted newest to oldest
    let notes = await models.Note.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1)

    // if the number of notes we find exceeds our limit
    // set hasNextPage to true & trim the notes to the limit
    if (notes.length > limit) {
      hasNextPage = true
      notes = notes.slice(0, -1)
    }

    // the new cursor will be the Mongo ObjectID of the last item in the feed array
    const newCursor = notes[notes.length - 1]._id

    return {
      notes,
      cursor: newCursor,
      hasNextPage,
    }
  },
}
