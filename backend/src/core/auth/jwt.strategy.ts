import { ConfigService } from '@nestjs/config'
import { UsersService } from './../users/users.service'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    readonly config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_KEY') ?? 'secretKey',
      // secretOrKey: 'secretKey',
    })
  }

  async validate({ iat, exp, id }, done) {
    const timeDiff = exp - iat
    if (timeDiff <= 0) {
      console.log('validate timeDiff', timeDiff)
      throw new UnauthorizedException()
    }
    const user = await this.userService.findUserById(id)
    if (!user) {
      console.log('validate UnauthorizedException')
      throw new UnauthorizedException()
    }
    // delete user.password
    const { password, ...result } = user

    done(null, result)
  }
}
