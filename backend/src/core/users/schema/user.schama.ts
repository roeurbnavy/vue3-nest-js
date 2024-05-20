import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class User {
  // @Prop({ required: false })
  // _id: string

  @Prop()
  username: string

  @Prop()
  name: string

  @Prop()
  password: string

  @Prop([String])
  roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
