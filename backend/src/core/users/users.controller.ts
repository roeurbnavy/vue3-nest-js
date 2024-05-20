import { UserUpdateDto } from './dto/update.dto';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorator/public.decorator';
import { Roles } from '@/common/decorator/roles.decorator';
import { AppRoles } from '@/common/enum/role.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) { }

  @Public()
  @Post()
  async getAll() {
    const data = await this.userService.getAll();
    return data;
  }

  @ApiBearerAuth()
  @Get('getById/:id')
  @ApiResponse({ status: 200, description: 'Successful ' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserById(@Param('id') id: string): Promise<any> {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @ApiBearerAuth()
  @Patch('update/:id')
  @Roles(AppRoles.ADMINS)
  async update(@Param('id') id: string, @Body() updateInput: UserUpdateDto) {
    return await this.userService.update(id, updateInput);
  }

  @ApiBearerAuth()
  @Delete('deleted/:id')
  @Roles(AppRoles.ADMINS)
  async deleted(@Param('id') id: string): Promise<any> {
    return await this.userService.delete(id);
  }
}
