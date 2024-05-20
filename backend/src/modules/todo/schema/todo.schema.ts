import mongoose, { Document } from 'mongoose'

export interface Todo extends Document {
  title: string
  des?: string
  status: string
  statusDate: Record<string, any>
}

const StatusDate = new mongoose.Schema(
  {
    todo: {
      type: Date,
      optional: true,
    },
    doing: {
      type: Date,
      optional: true,
    },
    done: {
      type: Date,
      optional: true,
    },
  },
  { _id: false }
)

export const TodoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    title: String,
    des: {
      type: String,
      optional: true,
    },
    status: String,
    statusDate: StatusDate,
    userId: String,
  },
  { timestamps: true }
)
