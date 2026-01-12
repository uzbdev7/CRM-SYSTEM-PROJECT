import { Controller, Get, Patch, Delete, Req, Body, Param, UseGuards, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/role.guards'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload)
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.usersService.verifyOtp(body.email, body.otp);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: any
  ) {
    return this.usersService.login(body.email, body.password, res);
  }
  
  @Get('all')
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  getAllStaffProfile() {
    return this.usersService.getAllStaffProfile();
  }

  @Get('profile')
  @UseGuards(RolesGuard)
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() body: UpdateUserDto, @Req() req) {
    return this.usersService.update(Number(id), body, req.user);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.usersService.remove(Number(id), req.user);
  }
}
