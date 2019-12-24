import mongoose, { Schema, Document } from 'mongoose'

// type interface
interface NoteInterface extends Document {
  content: string
  author: string
  timestamps: boolean
}

// Define the note's database schema
const noteSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // add the favoriteCount property
    favoriteCount: {
      type: Number,
      default: 0
    },
    // add the favoritedBy property
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true,
  },
)

// Define the 'Note' model with the schema
const Note = mongoose.model<NoteInterface>('Note', noteSchema)

// Export the module
export default Note
