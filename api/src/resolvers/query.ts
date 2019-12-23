module.exports = {
    notes: async (_: any, args: any, {models}: any) => {
      return await models.Note.find()
    },
    note: async (_: any, args: { id: string }, {models}: any) => {
      return await models.Note.findById(args.id)
    },
  }

