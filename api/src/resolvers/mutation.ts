import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {AuthenticationError, ForbiddenError} from 'apollo-server-express'
require('dotenv').config()
import gravatar from '../util/gravatar'

interface Note {
  id: string
  content: string
  author: string
}

// type interface
interface UserInterface {
  username: string
  email: string
  password: boolean
  avatar?: string
}


module.exports = {
  newNote: async (_: any, args: Note, { models }: any) => {
    return await models.Note.create({
      content: args.content,
      author: 'Adam Scott',
    })
  },
  deleteNote: async (_: any, { id }: { id: string }, { models }: any) => {
    try {
      await models.Note.findOneAndRemove({ _id: id })
      return true
    } catch (err) {
      return false
    }
  },
  updateNote: async (_: any, { content, id }: {content: string, id: string}, { models }: any) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content } },
      { new: true },
    )
  },
  signUp: async (_: any, { username, email, password }: UserInterface, { models }: any) => {
    // normalize email address
    email = email.trim().toLowerCase();
    // hash the password
    const hashed = await bcrypt.hash(password, 10);
    // create the gravatar url
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed
      });

      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      } catch (err) {
        console.log(err);
        // if there's a problem creating the account, throw an error
        throw new Error('Error creating account');   } },

    signIn: async (_: any, { username, email, password }: UserInterface, { models }: any) => {
      if (email) {
        // normalize email address
        email = email.trim().toLowerCase();
      }
      const user = await models.User.findOne({
        $or: [{ email }, { username }]
      });

      // if no user is found, throw an authentication error
      if (!user) {
        throw new AuthenticationError('Error signing in');
      }

      // if the passwords don't match, throw an authentication error
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Error signing in');
      }

      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET); }
}

