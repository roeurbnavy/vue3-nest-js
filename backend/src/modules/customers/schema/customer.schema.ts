import mongoose, { Document } from 'mongoose'

export interface Customers extends Document {
  name: string
  refNo: string
  telephone?: string
  address?: string
}

export const CustomerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: String,
    refNo: {
      type: String,
    },
    telephone: {
      type: String,
      optional: true,
    },
    address: {
      type: String,
      optional: true,
    },
    status: String,
  },
  { timestamps: true }
)
