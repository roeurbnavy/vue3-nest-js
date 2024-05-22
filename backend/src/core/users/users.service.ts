import { Hash } from './../../util/Hash'
import { UserUpdateDto } from './dto/update.dto'
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schema/user.schama'
import { Model } from 'mongoose'
import { RegisterDto } from '../auth/dto/register.dto'
import { ChangePasswordDto } from '../auth/dto/changePassword.dto'

type UserType = any

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'auth')
    private readonly userModel: Model<User>
  ) { }

  async findUserById(id: string): Promise<any> {
    const user = await this.userModel.findOne({ _id: id }).lean()
    if (!user) {
      throw 'User not found!'
    }
    const { password, ...result } = user
    return result
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find({}).lean()
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username }).lean()

    return user
  }

  async create(payload: RegisterDto): Promise<User> {
    const user = await this.userModel.findOne({
      username: payload.username,
    })
    if (user) {
      throw new NotAcceptableException(
        'Admin with provided username already created.'
      )
    }
    const doc: any = payload
    doc.password = Hash.make(payload?.password)
    return this.userModel.create(doc)
  }

  async changePassword(payload: ChangePasswordDto): Promise<number> {
    const user = await this.findOneByUsername(payload.username)

    if (!user || !Hash.compare(payload.currentPassword, user.password)) {
      throw new UnauthorizedException('Invalid credential!')
    }
    const password = Hash.make(payload.password)
    const res = await this.userModel.updateOne(
      { _id: user?._id },
      { $set: { password } }
    )
    return res.matchedCount
  }

  async update(id: string, payload: UserUpdateDto): Promise<UserType> {
    const user = await this.userModel.findOne({ _id: id })
    const update = { ...user, ...payload }
    delete update.password
    // const {password,...doc} = update
    try {
      return await this.userModel.updateOne({ _id: id }, { $set: update })
    } catch (error) {
      throw new NotAcceptableException('Username Or Email is exist')
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.findUserById(id)
    const deleted: any = await this.userModel.deleteOne({ _id: id })
    if (deleted) {
      return { message: `Deleted ${user.username} from records` }
    } else {
      throw new BadRequestException(
        `Failed to delete a profile by the name of ${user.username}.`
      )
    }
  }
}
