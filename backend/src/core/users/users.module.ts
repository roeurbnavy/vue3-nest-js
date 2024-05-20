import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/user.schama'

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'auth'
    ),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [UsersService],
  controllers: [UserController],
  providers: [UsersService, UserController],
})
export class UsersModule { }
