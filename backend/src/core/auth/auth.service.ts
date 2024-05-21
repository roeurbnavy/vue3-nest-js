import { Hash } from './../../util/Hash'
import { LoginDto } from './dto/login.dto'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
// import { User } from '../users/entity/user.schama'
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private config: ConfigService
  ) { }

  async createToken(user: any) {
    try {
      const EXPIRES = this.config.get<string>('JWT_EXPIRES') ?? '30 days'
      const payload = {
        expiresIn: `${EXPIRES}`,
        accessToken: this.jwtService.sign({ id: user._id, secret: 'secret' }),
        user,
      }
      console.log('payload', payload)
      return payload
    } catch (error) {
      console.log('error', error)
    }
  }

  async validateUser(payload: LoginDto): Promise<any> {
    const user = await this.userService.findOneByUsername(payload.username)
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Username or Password is not correct!')
    }
    // delete user.password
    const { password, ...res } = user

    return res
  }
}
