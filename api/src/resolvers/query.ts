module.exports = {
  notes: async (_: any, args: any, { models }: any) => {
    return await models.Note.find()
  },
  note: async (_: any, args: { id: string }, { models }: any) => {
    return await models.Note.findById(args.id)
  },
  // add the following to the existing module.exports object:
  user: async (_: any, { username }: {username: string}, { models }: any) => {
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
}

