import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { AuthService } from './core/auth/auth.service';
import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorator/public.decorator';

@ApiBearerAuth()
@ApiTags('App')
@Controller()
export class AppController {
  // constructor(private authService: AuthService) { }

  // constructor(private readonly appSerive: AppService) { }
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return 'loin';
  //   // this.authService.login(req.user);
  // }

  @Public()
  @Get()
  getHello(): string {
    return 'Hello Worl'
    // this.appSerive.getHello();
  }
}
