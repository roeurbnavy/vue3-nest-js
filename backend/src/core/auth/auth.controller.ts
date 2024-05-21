import { Public } from './../../common/decorator/public.decorator';
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'


import { ChangePasswordDto } from './dto/changePassword.dto'
import { CurrentUser } from '../../common/decorator/currentUser.decorator'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { User } from '../users/schema/user.schama'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Public()
  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginInput: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(loginInput)
    return await this.authService.createToken(user)
  }

  @Public()
  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() doc: RegisterDto): Promise<any> {
    return await this.usersService.create(doc)
  }

  @Public()
  @Post('changePassword')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(@Body() userInput: ChangePasswordDto): Promise<number> {
    const user = this.usersService.changePassword(userInput)

    return user
  }

  @ApiBearerAuth()
  @Get('currentUser')
  currentUser(@CurrentUser() user: any) {
    return this.usersService.findUserById(user._id)
  }
}
