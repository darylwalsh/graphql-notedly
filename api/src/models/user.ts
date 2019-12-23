import mongoose, { Schema, Document } from 'mongoose'


// type interface
interface UserInterface extends Document {
  username: string
  email: string
  password: boolean
  avatar?: string
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
  );


// Define the 'Note' model with the schema
const User = mongoose.model<UserInterface>('User', userSchema)

// Export the module
export default User
